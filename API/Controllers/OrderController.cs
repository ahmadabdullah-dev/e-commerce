namespace API.Controllers;

public class OrderController : BaseApiController
{
    private readonly IOrderService _orderService;
    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }
}
