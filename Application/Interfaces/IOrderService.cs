namespace Application.Interfaces;

public interface IOrderService
{
    Task<Result<string>> CreateOrderAsync(CreateOrderDto dto, CancellationToken ct);
}
