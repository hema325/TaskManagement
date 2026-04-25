using TaskManagement.Enums;

namespace TaskManagement.Entities
{
    public class Permission: BaseEntity
    {
        public Permissions Value { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
