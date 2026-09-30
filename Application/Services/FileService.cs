using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Services;

public class FileService : IFileService
{
    private readonly Cloudinary _cloudinary;

    public FileService(IOptions<CloudinaryConfigurations> config)
    {
        var account = new Account( config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);

        _cloudinary = new Cloudinary(account) { Api = { Secure = true } };
    }

    public Task<Result<CloudUploadResult>> UploadImage(IFormFile file)
        => Upload(file, new ImageUploadParams(), "e-commerce/images");

    public Task<Result<CloudUploadResult>> UploadRawFile(IFormFile file)
        => Upload(file, new RawUploadParams(), "e-commerce/raws");

    private async Task<Result<CloudUploadResult>> Upload(IFormFile? file, RawUploadParams uploadParams, string folder)
    {
        if (file is null || file.Length == 0)
            return Result<CloudUploadResult>.Failure("No file found", 400);

        await using var stream = file.OpenReadStream();

        uploadParams.File = new FileDescription(file.FileName, stream);
        uploadParams.Folder = folder;
        uploadParams.UseFilename = false;
        uploadParams.UniqueFilename = true;

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
            return Result<CloudUploadResult>.Failure(uploadResult.Error.Message, 400);

        return Result<CloudUploadResult>.Success(
            new CloudUploadResult(uploadResult.SecureUrl.ToString(), uploadResult.PublicId));
    }

    public async Task<Result<string>> DeleteFile(string publicId, ResourceType resourceType = ResourceType.Image)
    {
        var deletionParams = new DeletionParams(publicId)
        {
            ResourceType = resourceType
        };

        var result = await _cloudinary.DestroyAsync(deletionParams);

        if (result.Error != null)
            return Result<string>.Failure(result.Error.Message, 400);

        if (result.Result != "ok")
            return Result<string>.Failure("File not found or already deleted", 404);

        return Result<string>.Success("File deleted successfully");
    }
}