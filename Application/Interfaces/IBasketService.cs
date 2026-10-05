namespace Application.Interfaces;
public interface IBasketService
{
    Task<Result<BasketDto>> GetCurrentUserBasket(CancellationToken ct);
}
