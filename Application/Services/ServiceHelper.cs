using Microsoft.AspNetCore.Identity;

namespace Application.Services;

public static class ServiceHelper
{
    public static string GetFirstError(IdentityResult result) =>
        result.Errors.FirstOrDefault()?.Description ?? "Unexpected error happened";
}
