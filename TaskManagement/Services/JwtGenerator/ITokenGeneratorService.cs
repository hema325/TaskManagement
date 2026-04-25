using System.Security.Claims;
using TaskManagement.Entities;
using TaskManagement.Helpers;

namespace TaskManagement.Services.JwtGenerator
{
    public interface ITokenGeneratorService
    {
        Token Generate(User user);
    }
}
