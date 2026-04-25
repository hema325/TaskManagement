using TaskManagement.Data;

namespace TaskManagement.Extensions
{
    public static class DbInitializerMiddleware
    {
        public static async Task<WebApplication> InitializeDbAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var initializer = scope.ServiceProvider.GetRequiredService<AppDbContextInitializer>();
            await initializer.InitializeAsync();

            return app;
        } 
    }
}
