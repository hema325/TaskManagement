namespace TaskManagement.Services.CurrentUser
{
    public interface ICurrentUserService
    {
        public int? Id { get; }
        public string? UserName { get; }
    }
}
