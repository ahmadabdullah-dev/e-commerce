namespace Application.Interfaces;
public interface IUserService
{
    string? GetCurrentUserId();
    string? GetCurrentUserRole();
    Task<Result<UserDto>> GetCurrentUserAsync();
    Task<Result<string>> UpdateCurrentUserAsync(UpdateUserDto dto, CancellationToken ct);
    Task<Result<string>> RequestUpdateCurrentEmailAsync(string newEmail);
    Task<Result<string>> UpdateCurrentEmailAsync(string code);
    Task<Result<string>> ResendUpdateCurrentEmailConfirmationCodeAsync();
}
