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
}
