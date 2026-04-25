using TaskManagement.Enums;

namespace TaskManagement.Dtos.Auth
{
    public class SessionDto
    {
        public string UserName { get; set; }
        public IEnumerable<Permissions> Permissions { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
