using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagement.Enums;
using TaskManagement.Settings;

namespace TaskManagement.Extensions
{
    public static class AuthDI
    {
        public static WebApplicationBuilder AddAuth(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                var settings = builder.Configuration.GetSection(JwtSettings.Section).Get<JwtSettings>() ?? throw new ArgumentNullException();
                opt.TokenValidationParameters = new()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = settings.Issuer,
                    ValidAudience = settings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Key))
                };
            });

            builder.Services.AddAuthorization(builder =>
            {
                foreach (var permission in Enum.GetValues<Permissions>())
                {
                    builder.AddPolicy(permission.ToString(), policy =>
                    {
                        policy.RequireAuthenticatedUser();
                        policy.RequireClaim("permission", permission.ToString());
                    });
                }
            });

            return builder;
        }
    }
}
