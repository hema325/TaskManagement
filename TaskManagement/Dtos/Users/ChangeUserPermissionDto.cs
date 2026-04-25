using TaskManagement.Enums;

namespace TaskManagement.Dtos.Users
{
    public class ChangeUserPermissionDto
    {
        public int UserId { get; set; }
        public Permissions[] Permissions { get; set; }
    }
}
