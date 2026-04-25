using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagement.Data;
using TaskManagement.Dtos.Auth;
using TaskManagement.Dtos.Users;
using TaskManagement.Enums;
using TaskManagement.Helpers;
using TaskManagement.Services.CurrentUser;
using TaskManagement.Services.JwtGenerator;

namespace TaskManagement.Controllers
{
    [Route("api/auth")]
    public class AuthController: BaseController
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ITokenGeneratorService _tokenGenerator;
        private readonly ICurrentUserService _currentUserService;

        public AuthController(AppDbContext context, IMapper mapper, ICurrentUserService currentUserService, ITokenGeneratorService tokenGenerator)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users
                .Include(u=>u.Permissions)
                .FirstOrDefaultAsync(u => u.UserName == dto.UserName);

            if (user == null || user.Password != dto.Password)
                return Error("Invalid user credentials.");

            var token = _tokenGenerator.Generate(user);
            var response = new SessionDto
            {
                UserName = user.UserName,
                Permissions = user.Permissions.Select(p => p.Value),
                Token = token.Value,
                ExpiresAt = token.ExpiresAt
            };

            return Success(response);
        }

        [HttpGet("current-user")]
        [Authorize]
        public async Task<IActionResult> CurrentUser()
        {
            var user = await _context.Users
                        .Include(u => u.Permissions)
                        .FirstOrDefaultAsync(u => u.Id == _currentUserService.Id);

            if (user == null)
                return Error("Unauthenticated user.");

            var response = _mapper.Map<UserDto>(user);
            return Success(response);
        }
    }
}
