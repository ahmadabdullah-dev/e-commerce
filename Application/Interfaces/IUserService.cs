namespace Application.Interfaces;
public interface IUserService
{
    string? GetCurrentUserId();
    string? GetCurrentUserRole();
    Task<Result<UserDto>> GetCurrentUserAsync();

    Task<Result<string>> UpdateCurrentUserAsync(UpdateUserDto dto, CancellationToken ct);
}
