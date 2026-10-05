namespace Application.Services;

public class BasketService : IBasketService
{
    private readonly IBasketRepository _basketRepository;
    private readonly IUserService _userService;
    public BasketService(IBasketRepository basketRepository, IUserService userService)
    {
        _basketRepository = basketRepository;
        _userService = userService;
    }
    public async Task<Result<BasketDto>> GetCurrentUserBasket(CancellationToken ct)
    {
        var currentUser = await _userService.GetCurrentUserAsync(ct);
        
        if(currentUser == null)
            return Result<BasketDto>.Failure("User is not authenticated.",403);

        if(string.IsNullOrEmpty(currentUser.Value?.BasketId))
            return Result<BasketDto>.Failure("User does not have a basket.", 404);

        var basket = await _basketRepository.GetByIdAsync(currentUser.Value.BasketId, ct);

        if(basket == null)
            return Result<BasketDto>.Failure("Basket not found.",404);

        var basketDto = new BasketDto
        {
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
            }).ToList()
        };

        return Result<BasketDto>.Success(basketDto);
    }

}
