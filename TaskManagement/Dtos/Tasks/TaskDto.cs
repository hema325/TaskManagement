namespace TaskManagement.Dtos.Tasks
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
}
