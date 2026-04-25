namespace TaskManagement.Entities
{
    public class User: BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public ICollection<Permission> Permissions { get; set; }
        public ICollection<TaskEntry> Tasks { get; set; }
    }
}
