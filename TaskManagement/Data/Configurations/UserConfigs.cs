using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskManagement.Entities;

namespace TaskManagement.Data.Configurations
{
    public class UserConfigs : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.UserName).IsUnique();
        }
    }
}
