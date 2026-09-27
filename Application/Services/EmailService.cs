using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Application.Services;
public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfig;
    private readonly UserManager<AppUser> _userManager;
    private readonly ILogger<EmailService> _logger;

    public EmailService(
        IOptions<EmailConfiguration> emailConfig,
        UserManager<AppUser> userManager,
        ILogger<EmailService> logger)
    {
        _emailConfig = emailConfig.Value;
        _userManager = userManager;
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string htmlContent)
    {
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(_emailConfig.From));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;
        message.Body = new TextPart("html") { Text = htmlContent };

        using var client = new SmtpClient();
        await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, _emailConfig.EnableSsl);
        await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);

        _logger.LogInformation($"Email sent to {to}");
    }

    public async Task SendCodeAsync(AppUser user, string emailSubject, string purpose, string? differentEmail = null)
    {
        var code = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultEmailProvider, purpose);

        var html = $"<p>Your {emailSubject} code is: <strong>{code}</strong></p>";

        var targetEmail = differentEmail ?? user.Email!;

        await SendEmailAsync(targetEmail, emailSubject, html);

        _logger.LogInformation($"{emailSubject} sent to {targetEmail}");

    }

}