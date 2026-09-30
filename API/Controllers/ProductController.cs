using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductController : BaseApiController
{
    private readonly IProductService _productService;
    public ProductController(IProductService productService)
    {
        _productService = productService;
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("add")]
    [RequestSizeLimit(6 * 1024 * 1024)] // 6mb
    public async Task<IActionResult> AddProduct([FromForm] AddProductDto dto, CancellationToken ct)
    {
        var result = await _productService.AddProductAsync(dto, ct);
        return HandleResult(result);
    }
}
