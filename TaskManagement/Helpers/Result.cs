namespace TaskManagement.Helpers
{
    public class Result
    {
        public bool IsSuccess { get; init; } = false;
        public object? Data { get; init; } = default;
        public string? Message { get; init; } = null;
        public string? Description { get; init; } = null;
        public IEnumerable<string>? Errors { get; init; } = null;

        // factory methods
        public static Result Success()
            => new Result
            {
                IsSuccess = true,
            };

        public static Result Success(object Data)
            => new Result
            {
                IsSuccess = true,
                Data = Data
            };

        public static Result Error(string? message = null, string? description = null)
            => new Result
            {
                Message = message ?? "Something went wrong.",
                Description = description
            };

        public static Result Error(IEnumerable<string> errors)
            => new Result
            {
                Errors = errors
            };
    }
}
