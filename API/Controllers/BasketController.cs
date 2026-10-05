using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly IBasketService _basketService;
    public BasketController(IBasketService basketService)
    {
        _basketService = basketService; 
    }

    [Authorize]
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentUserBasket(CancellationToken ct)
    {
        var result = await _basketService.GetCurrentUserBasket(ct);
        return HandleResult(result);
    }
}
