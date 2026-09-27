using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace   Application.Services;

public class AuthService : IAuthService
{
    private readonly SignInManager<AppUser> _signInManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<AuthService> _logger;  

    public AuthService(SignInManager<AppUser> signInManager,
        UserManager<AppUser> userManager,
        ApplicationDbContext dbContext,
        ILogger<AuthService> logger)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _dbContext = dbContext;
        _logger = logger;
    }
    public async Task<Result<string>> LoginAsync(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email.ToLower());

        if (user == null)
            return Result<string>.Failure("Invalid email or password", 401);

        if (await _userManager.IsLockedOutAsync(user))
            return Result<string>.Failure("User is locked. Please reset the password or wait 3 Minute.", 400);

        var loginResult = await _signInManager.PasswordSignInAsync(user, dto.Password, dto.IsPersistence, true);

        if (loginResult.IsLockedOut)
            return Result<string>.Failure("User is locked. Please reset the password or wait 3 Minute.", 400);

        if (!loginResult.Succeeded)
            return Result<string>.Failure("Invalid email or password", 401);

        if (user.LockoutEnd != null)
            await _userManager.SetLockoutEndDateAsync(user, null);

        return Result<string>.Success("Logged in successfully");
    }
}
