using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace   Application.Services;

public class AuthService : IAuthService
{
    private readonly SignInManager<AppUser> _signInManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<AuthService> _logger;
    private readonly IEmailService _emailService;
    private readonly IUserService _userService;


    public AuthService(SignInManager<AppUser> signInManager,
        UserManager<AppUser> userManager,
        ApplicationDbContext dbContext,
        ILogger<AuthService> logger,
        IEmailService emailService,
        IUserService userService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _dbContext = dbContext;
        _logger = logger;
        _emailService = emailService;
        _userService = userService;
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
    public async Task<Result<string>> RegisterAsync(RegisterDto dto)
    {
        var newUser = new AppUser
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            UserName = dto.Email,
            Email = dto.Email,
            EmailConfirmed = false,
        };

        var registerResult = await _userManager.CreateAsync(newUser, dto.Password);

        if (!registerResult.Succeeded)
            return Result<string>.Failure(ServiceHelper.GetFirstError(registerResult), 400);

        var roleResult = await _userManager.AddToRoleAsync(newUser, UserRoles.CUSTOMER);

        if (!roleResult.Succeeded)
        {
            await _userManager.DeleteAsync(newUser);
            return Result<string>.Failure(ServiceHelper.GetFirstError(roleResult), 400);
        }
        try
        {
            await _emailService.SendCodeAsync(newUser, "Email Confirmation", EmailPurposes.EMAIL_CONFIRMATION);
        }
        catch (Exception ex)
        {
            await _userManager.DeleteAsync(newUser);
            return Result<string>.Failure(ex.Message, 400);
        }
        return Result<string>.Success("Registered successfully.");
    }
    public async Task<Result<string>> LogoutAsync()
    {
        await _signInManager.SignOutAsync();
        return Result<string>.Success("Logged out successfully");
    }
    public async Task<Result<string>> ConfirmEmailAsync(string code)
    {
        var userId = _userService.GetCurrentUserId();

        if (userId == null)
            return Result<string>.Failure("Unauthorized", 401);

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return Result<string>.Failure("Current user not found in db", 404);

        if (await _userManager.IsEmailConfirmedAsync(user))
            return Result<string>.Failure("Email already confirmed", 400);

        var isValid = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultEmailProvider, EmailPurposes.EMAIL_CONFIRMATION, code);

        if (!isValid)
            return Result<string>.Failure("Invalid or expired code.", 404);

        user.EmailConfirmed = true;

        var updateResult = await _userManager.UpdateAsync(user);

        if (!updateResult.Succeeded)
            return Result<string>.Failure(ServiceHelper.GetFirstError(updateResult), 400);

        return Result<string>.Success("Email confirmed successfully.");
    }
    public async Task<Result<string>> ResendEmailConfirmationCodeAsync()
    {
        var userId = _userService.GetCurrentUserId();

        if (userId == null)
            return Result<string>.Failure("Unauthorized", 401);

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return Result<string>.Failure("Current user not found in db", 404);

        if (await _userManager.IsEmailConfirmedAsync(user))
            return Result<string>.Failure("Email already confirmed", 400);

        try
        {
            await _emailService.SendCodeAsync(user, "Email Confirmation", EmailPurposes.EMAIL_CONFIRMATION);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Result<string>.Failure("Unexpected error happened while resending email confirmation code", 400);
        }

        return Result<string>.Success("Email Confirmation code has been resent successfully");

    }
}
