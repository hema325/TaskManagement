using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Helpers;

namespace TaskManagement.Filters
{
    public class GlobalExceptionHandler: IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var result = new Result
            {
                Message = exception.Message ?? "Internal Server Error",
                Description = exception.StackTrace?.ToString()
            };

            httpContext.Response.StatusCode = 500;
            await httpContext.Response.WriteAsJsonAsync(result);

            return true;
        }
    }
}
