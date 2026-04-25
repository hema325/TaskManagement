using TaskManagement.Entities;
using TaskManagement.Enums;

namespace TaskManagement.Dtos.Users
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public IEnumerable<Permissions> Permissions { get; set; }
    }
}
