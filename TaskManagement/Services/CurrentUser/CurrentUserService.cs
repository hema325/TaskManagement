using System.Security.Claims;

namespace TaskManagement.Services.CurrentUser
{
    public class CurrentUserService: ICurrentUserService
    {
        private readonly HttpContext _context;

        public CurrentUserService(IHttpContextAccessor accessor)
        {
            _context = accessor.HttpContext ?? throw new ArgumentNullException();
        }

        public int? Id
        {
            get
            {
                var identifier = _context.User.FindFirstValue(ClaimTypes.NameIdentifier);
                
                if (int.TryParse(identifier, out var id))
                    return id;

                return null;
            }
        }

        public string? UserName => _context.User.FindFirstValue(ClaimTypes.Name);
    }
}
