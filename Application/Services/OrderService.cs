namespace Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IUserService _userService;
    private readonly IProductService _productService;
    public OrderService(IOrderRepository orderRepository, IUserService userService, IProductService productService)
    {
        _orderRepository = orderRepository;
        _userService = userService;
        _productService = productService;
    }
    public async Task<Result<string>> CreateOrderAsync(CreateOrderDto dto, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();
        if (string.IsNullOrEmpty(userId))
            return Result<string>.Failure("User is not authenticated.", 401);

        var ids = dto.Products.Select(p => p.ProductId).Distinct().ToList();

        foreach (var id in ids)
        {
            if (!await _productService.IsProductExistsByIdAsync(id, ct))
                return Result<string>.Failure($"Product with ID {id} not found.", 404);
        }

        var prices = await _productService.GetPricesByIdsAsync(ids, ct);

        var order = new Order
        {
            OrderedUserId = userId,
            OrderStatus = OrderStatuses.PENDING,
            ShippingAddress = dto.ShippingAddress,
            Products = dto.Products.Select(p => new ProductOrderItem
            {
                ProductId = p.ProductId,
                Quantity = p.Quantity,
                UnitPrice = prices[p.ProductId]
            }).ToList()
        };

        await _orderRepository.AddAsync(order, ct);
        await _orderRepository.SaveChangesAsync(ct);

        return Result<string>.Success(order.Id);
    }
}
