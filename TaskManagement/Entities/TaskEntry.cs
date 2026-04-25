namespace TaskManagement.Entities
{
    public class TaskEntry:BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
