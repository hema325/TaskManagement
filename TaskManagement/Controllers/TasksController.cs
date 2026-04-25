using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Attributes;
using TaskManagement.Data;
using TaskManagement.Dtos.Tasks;
using TaskManagement.Entities;
using TaskManagement.Enums;
using TaskManagement.Services.CurrentUser;

namespace TaskManagement.Controllers
{
    [Route("api/tasks")]
    public class TasksController : BaseController
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public TasksController(AppDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        [HttpPost]
        [HasPermission(Permissions.TaskCreate)]
        public async Task<IActionResult> CreateAsync(CreateTaskDto dto)
        {
            var task = _mapper.Map<TaskEntry>(dto);

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Success(task.Id);
        }

        [HttpPut]
        [HasPermission(Permissions.TaskUpdate)]
        public async Task<IActionResult> UpdateAsync(UpdateTaskDto dto)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == dto.Id);

            if (task == null)
                return Error("Not Found");

            _mapper.Map(dto, task);
            await _context.SaveChangesAsync();

            return Success();
        }

        [HttpDelete("{id}")]
        [HasPermission(Permissions.TaskDelete)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
                return Error("Not Found");

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Success();
        }

        [HttpGet("{id}")]
        [HasPermission(Permissions.TaskRead)]
        public async Task<IActionResult> GetAllAsync(int id)
        {
            var task = await _context.Tasks
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(t=>t.Id == id);

            if (task == null)
                return Error("Task is not found.");

            return Success(task);
        }

        [HttpGet]
        [HasPermission(Permissions.TaskRead)]
        public async Task<IActionResult> GetAllAsync(int? userId)
        {
            var query = _context.Tasks.AsQueryable();

            if (userId != null)
                query = query.Where(t => t.UserId == userId);

            var tasks = await query
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Success(tasks);
        }

        #region current user tasks
        [HttpGet("current-user-tasks")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUserTasksAsync()
        {
            var tasks = await _context.Tasks
                .Where(t => t.UserId == _currentUser.Id!.Value)
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Success(tasks);
        }

        [HttpPatch("toggleTask/{id}")]
        [Authorize]
        public async Task<IActionResult> ToggleCurrentUserTasksAsync(int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == _currentUser.Id);

            if (task == null)
                return Error("Not Found");

            task.IsDone = !task.IsDone;
            await _context.SaveChangesAsync();

            return Success();
        }
        #endregion
    }
}
