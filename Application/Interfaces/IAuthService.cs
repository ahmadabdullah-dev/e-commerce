namespace Application.Interfaces;
public interface IAuthService
{
    Task<Result<string>> LoginAsync(LoginDto dto);
    Task<Result<string>> RegisterAsync(RegisterDto dto);
    Task<Result<string>> LogoutAsync();
    Task<Result<string>> ConfirmEmailAsync(string code);
    Task<Result<string>> ResendEmailConfirmationCodeAsync();
    Task<Result<string>> ForgetPasswordAsync(string email);

}
