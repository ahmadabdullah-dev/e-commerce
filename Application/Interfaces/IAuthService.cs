namespace Application.Interfaces;
public interface IAuthService
{
    Task<Result<string>> LoginAsync(LoginDto dto);
    Task<Result<string>> RegisterAsync(RegisterDto dto);
    Task<Result<string>> LogoutAsync();

}
