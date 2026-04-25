using Microsoft.AspNetCore.Mvc;
using TaskManagement.Helpers;

namespace TaskManagement.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult Success()
            => Ok(Result.Success());

        protected IActionResult Success(object data)
            => Ok(Result.Success(data));

        protected IActionResult Error(string message, string? description = null)
            => BadRequest(Result.Error(message, description));

        protected IActionResult Error(IEnumerable<string> errors)
            => BadRequest(Result.Error(errors));
    }
}
