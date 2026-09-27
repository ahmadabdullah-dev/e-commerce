using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);

        return HandleResult(result);
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);

        return HandleResult(result);
    }
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var result = await _authService.LogoutAsync();

        return HandleResult(result);
    }
    [Authorize]
    [HttpPatch("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(string code)
    {
        var result = await _authService.ConfirmEmailAsync(code);

        return HandleResult(result);
    }
    [Authorize]
    [HttpPost("resend-email-confirmation-code")]
    public async Task<IActionResult> ResendEmailConfirmationCode()
    {
        var result = await _authService.ResendEmailConfirmationCodeAsync();
        return HandleResult(result);
    }
}
