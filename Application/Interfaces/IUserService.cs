namespace Application.Interfaces;
public interface IUserService
{
    string? GetCurrentUserId();
    string? GetCurrentUserRole();
    Task<Result<UserDto>> GetCurrentUserAsync(CancellationToken ct);
    Task<Result<string>> UpdateCurrentUserAsync(UpdateUserDto dto, CancellationToken ct);
    Task<Result<string>> RequestUpdateCurrentEmailAsync(RequestUpdateCurrentEmailDto dto);
    Task<Result<string>> UpdateCurrentEmailAsync(UpdateCurrentEmailDto dto);
    Task<Result<string>> ResendUpdateCurrentEmailConfirmationCodeAsync();
    Task<Result<string>> UpdateCurrentUserNameAsync(string userName);
    Task<Result<string>> DeleteCurrentUserAsync();

}
