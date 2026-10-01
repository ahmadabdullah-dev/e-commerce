using Microsoft.Extensions.Logging;

namespace Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IFileService _fileService;
    private readonly ILogger<ProductService> _logger;
    public ProductService(
        IProductRepository productRepository,
        IFileService fileService,
        ILogger<ProductService> logger)
    {
        _productRepository = productRepository;
        _fileService = fileService;
        _logger = logger;

    }

    public async Task<Result<string>> AddProductAsync(AddProductDto dto, CancellationToken ct)
    {
        string? imageUrl = null;
        string? imagePublicId = null;

        if (dto.Image is not null)
        {
            var imageResult = await _fileService.UploadImage(dto.Image);
        
            if (!imageResult.IsSuccess)
               return Result<string>.Failure(imageResult.Error!,400);
           
            imageUrl = imageResult.Value!.Url;
            imagePublicId = imageResult.Value.PublicId;
        }

        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            ImageUrl = imageUrl,
            ImagePublicId = imagePublicId,

        };
        try
        {
            await _productRepository.AddAsync(product, ct);
            await _productRepository.SaveChangesAsync(ct);

        }
        catch(Exception ex)
        {
            _logger.LogError(ex, $"Failed to save product {dto.Name}");
           
            if(imagePublicId is not null)
            {
                var cleanup = await _fileService.DeleteFile(imagePublicId);
                if (!cleanup.IsSuccess)
                    _logger.LogWarning($"Orphaned Cloudinary image {imagePublicId}");
            }

            throw;
        }
        return Result<string>.Success("Product added successfully");

    }
    public async Task<Result<PagedList<ProductDto>>> GetAllProductsAsync(PaginationParams p, CancellationToken ct)
    {
        var products = await _productRepository.GetAllAsync(p, ct);

        var dtos = new PagedList<ProductDto>
        {
            Items = products.Items.Select(x => new ProductDto 
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                ImageUrl = x.ImageUrl,
                IsActive = x.IsActive

            }).ToList(),

            CurrentPage = products.CurrentPage,
            TotalCount = products.TotalCount,
            TotalPages = products.TotalPages

        };
        return Result<PagedList<ProductDto>>.Success(dtos);
    }

    public async Task<Result<ProductDto>> GetProductByIdAsync(string id, CancellationToken ct)
    {
        var product = await _productRepository.GetByIdAsync(id, ct);
       
        if (product is null)
            return Result<ProductDto>.Failure("Product not found", 404);
      
        var dto = new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            ImageUrl = product.ImageUrl,
            IsActive = product.IsActive
        };
        return Result<ProductDto>.Success(dto);
    }
}
