using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);

        if (result.IsSuccess && result.Value == null)
            return NotFound();

        return result.ErrorCode switch
        {
            400 => BadRequest(result.Error),
            401 => Unauthorized(result.Error),
            404 => NotFound(result.Error),
            409 => Conflict(result.Error),
            422 => UnprocessableEntity(result.Error),
            _ => StatusCode(result.ErrorCode == 0 ? 500 : result.ErrorCode, result.Error)
        };
    }
}