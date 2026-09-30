using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Application.Services;

public static class ServiceHelper
{
    public static string GetFirstError(IdentityResult result) =>
        result.Errors.FirstOrDefault()?.Description ?? "Unexpected error happened";

    public static string? ValidateImage(IFormFile file)
    {  
        string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        long MaxSize = 5 * 1024 * 1024; // 5 MB

        if (file.Length == 0) return "File is empty";
        if (file.Length > MaxSize) return "File is too large (max 5 MB)";

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext)) return "Only jpg, png, webp allowed";

        if (!file.ContentType.StartsWith("image/")) return "Invalid content type";

        return null;
    }
}
