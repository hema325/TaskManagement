using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TaskManagement.Entities;

namespace TaskManagement.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<User> Users { get; private set; }
        public DbSet<Permission> Permissions { get; private set; }
        public DbSet<TaskEntry> Tasks { get; private set; }
    }
}
