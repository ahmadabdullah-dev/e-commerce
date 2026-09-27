namespace Application.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string htmlContent);
    Task SendCodeAsync(AppUser user, string emailSubject, string purpose, string? diffrentEmail = null);

}
