using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Attributes;
using TaskManagement.Data;
using TaskManagement.Dtos.Users;
using TaskManagement.Entities;
using TaskManagement.Enums;

namespace TaskManagement.Controllers
{
    [Route("api/users")]
    public class UsersController: BaseController
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UsersController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpPost]
        [HasPermission(Permissions.UserCreate)]
        public async Task<IActionResult> CreateAsync(CreateUserDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == dto.UserName))
                return Error("User name already Exists");

            var user = _mapper.Map<User>(dto);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Success(user.Id);
        }

        [HttpPut]
        [HasPermission(Permissions.UserChangePermission)]
        public async Task<IActionResult> UpdateAsync(ChangeUserPermissionDto dto)
        {
            if (!await _context.Users.AnyAsync(u => u.Id == dto.UserId))
                return Error("Not found user.");

            var permissions = await _context.Permissions
                       .Where(u => u.UserId == dto.UserId)
                       .ToListAsync();

            var newPermissionsSet = dto.Permissions.ToHashSet();
            var oldPermissionsSet = permissions.Select(p => p.Value).ToHashSet();
            var permissionsToBeRemoved = permissions.Where(p => !newPermissionsSet.Contains(p.Value));
            var permissionsToBeAdded = dto.Permissions.Where(p => !oldPermissionsSet.Contains(p)).Select(p => new Permission { Value = p, UserId = dto.UserId });

            _context.Permissions.RemoveRange(permissionsToBeRemoved);
            _context.Permissions.AddRange(permissionsToBeAdded);
            await _context.SaveChangesAsync();

            return Success();
        }

        [HttpDelete("{id}")]
        [HasPermission(Permissions.UserDelete)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=> u.Id == id);

            if (user == null)
                return Error("Not found user.");
            
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Success();
        }

        [HttpGet("{id}")]
        [HasPermission(Permissions.UserRead)]
        public async Task<IActionResult> GetAllAsync(int id)
        {
            var user = await _context.Users
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return Error("User not found");

            return Success(user);
        }

        [HttpGet]
        [HasPermission(Permissions.UserRead)]
        public async Task<IActionResult> GetAllAsync()
        {
            var users = await _context.Users
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Success(users);
        }

        [HttpGet("exists/{userName}")]
        [AllowAnonymous]
        public async Task<IActionResult> ExistsAsync(string userName)
        {
            var response = await _context.Users.AnyAsync(u => u.UserName == userName);
            return Success(response);
        }
    }
}
