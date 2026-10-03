using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UserController : BaseApiController
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var result = await _userService.GetCurrentUserAsync();
        return HandleResult(result);
    }
    [HttpPut("current")]
    public async Task<IActionResult> UpdateCurrentUser(UpdateUserDto dto, CancellationToken ct)
    {
        var result = await _userService.UpdateCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpPost("request-update-current-email/{newEmail}")]
    public async Task<IActionResult> RequestUpdateCurrentEmail(string newEmail)
    {
        var result = await _userService.RequestUpdateCurrentEmailAsync(newEmail);
        return HandleResult(result);
    }
    [HttpPatch("update-current-email/{code}")]
    public async Task<IActionResult> UpdateCurrentEmail(string code)
    {
        var result = await _userService.UpdateCurrentEmailAsync(code);
        return HandleResult(result);
    }
    [HttpPost("resend-update-current-email-confirmation-code")]
    public async Task<IActionResult> ResendUpdateCurrentEmailConfirmationCode()
    {
        var result = await _userService.ResendUpdateCurrentEmailConfirmationCodeAsync();
        return HandleResult(result);
    }
}
