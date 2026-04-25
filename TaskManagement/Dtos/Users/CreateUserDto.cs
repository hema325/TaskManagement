using TaskManagement.Enums;

namespace TaskManagement.Dtos.Users
{
    public class CreateUserDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public Permissions[] Permissions { get; set; }
    }
}
