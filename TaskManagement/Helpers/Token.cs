namespace TaskManagement.Helpers
{
    public class Token
    {
        public string Value { get; init; }
        public DateTime ExpiresAt { get; set; }
    }
}
