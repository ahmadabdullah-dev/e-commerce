using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IFileService, FileService>();

        services.Configure<EmailConfiguration>(configuration.GetSection("EmailConfiguration"));
        services.Configure<CloudinaryConfigurations>(configuration.GetSection("CloudinaryConfigurations"));

        return services;
    }
}
 