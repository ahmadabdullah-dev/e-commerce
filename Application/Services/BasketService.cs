namespace Application.Services;

public class BasketService : IBasketService
{
    private readonly IBasketRepository _basketRepository;
    public BasketService(IBasketRepository basketRepository)
    {
        _basketRepository = basketRepository;
    }
}
