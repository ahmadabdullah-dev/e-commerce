using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace Application.Services;
public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IEmailService _emailService;
    private readonly ILogger<UserService> _logger;
    public UserService(
        UserManager<AppUser> userManager,
        IHttpContextAccessor httpContextAccessor,
        IEmailService emailService,
        ILogger<UserService> logger

    )
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _emailService = emailService;
        _logger = logger;
    }
    public string? GetCurrentUserId()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
    public string? GetCurrentUserRole()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role);
    }
    public async Task<Result<UserDto>> GetCurrentUserAsync()
    {
        var userId = GetCurrentUserId();
        var role = GetCurrentUserRole();

        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
            return Result<UserDto>.Failure("You must be logged in to perform this action.", 403);

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return Result<UserDto>.Failure("User not found!. It may have been removed or deactivated.", 404);

        var dto = new UserDto
        {
            Id = userId,
            FirstName = user.FirstName!,
            LastName = user.LastName!,
            Email = user.Email!,
            IsEmailConfirmed = user.EmailConfirmed,
            Role = role,
        };
        return Result<UserDto>.Success(dto);
    }
    public async Task<Result<string>> UpdateCurrentUserAsync(UpdateUserDto dto, CancellationToken ct)
    {
        var userId = GetCurrentUserId();
        
        if (string.IsNullOrEmpty(userId))
            return Result<string>.Failure("You must be logged in to perform this action.", 403);
        
        var user = await _userManager.FindByIdAsync(userId);
       
        if (user == null)
            return Result<string>.Failure("User not found!. It may have been removed or deactivated.", 404);
            
        if(dto.FirstName !=  null)
            user.FirstName = dto.FirstName;
        
        if (dto.LastName != null)
            user.LastName = dto.LastName;

        var updateResult = await _userManager.UpdateAsync(user);
       
        if (!updateResult.Succeeded)
        {
            var errors = string.Join(", ", updateResult.Errors.Select(e => e.Description));
            return Result<string>.Failure($"Failed to update user: {errors}", 400);
        }
        return Result<string>.Success("User updated successfully.");
    }

}
