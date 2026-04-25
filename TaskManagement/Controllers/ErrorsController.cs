using Microsoft.AspNetCore.Mvc;
using TaskManagement.Helpers;

namespace TaskManagement.Controllers
{
    [Route("errors/{statusCode}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorsController: Controller
    {
        public IActionResult Error(int statusCode)
        {
            var response = Result.Success();
            if(statusCode < 200 || statusCode > 299)
                response = Result.Error(GetDefaultStatusMessage(statusCode));

            return StatusCode(statusCode, response);
        }

        private string? GetDefaultStatusMessage(int statusCode)
            => statusCode switch
            {
                400 => "One or more validations have occurred",
                401 => "You are not authorized",
                404 => "Resource wasn't found",
                500 => "Error occurred while processing your request",
                403 => "You are not allowed to do this action",
                _ => null
            };
    }
}
