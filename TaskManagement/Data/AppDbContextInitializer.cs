using Microsoft.EntityFrameworkCore;
using TaskManagement.Entities;
using TaskManagement.Enums;

namespace TaskManagement.Data
{
    public class AppDbContextInitializer
    {
        private readonly AppDbContext _context;

        public AppDbContextInitializer(AppDbContext context)
        {
            _context = context;
        }


        public async Task InitializeAsync()
        {
            await _context.Database.MigrateAsync();
            await SeedUserAsync();
        }

        private async Task SeedUserAsync()
        {
            if (!await _context.Users.AnyAsync())
            {
                var permissions = Enum.GetValues<Permissions>()
                  .Select(val => new Permission { Value = val })
                  .ToList();

                var user = new User
                {
                    UserName = "ibrahim",
                    Password = "Pa$$w0rd",
                    Permissions = permissions
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
