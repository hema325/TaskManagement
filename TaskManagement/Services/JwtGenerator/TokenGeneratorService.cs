using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagement.Entities;
using TaskManagement.Helpers;
using TaskManagement.Settings;

namespace TaskManagement.Services.JwtGenerator
{
    public class TokenGeneratorService: ITokenGeneratorService
    {
        private readonly JwtSettings _settings;

        public TokenGeneratorService(IOptions<JwtSettings> options)
        {
            _settings = options.Value;
        }

        public Token Generate(User user)
        {
            var claims = new List<Claim>
            {
                 new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                 new Claim(ClaimTypes.Name, user.UserName)
            };

            foreach(var permission in user.Permissions)
            {
                claims.Add(new Claim("permission", permission.Value.ToString()));
            }

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecruityToken = new JwtSecurityToken(
                issuer: _settings.Issuer,
                audience: _settings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(_settings.ExpirationInDays),
                signingCredentials: signingCredentials);

            return new Token
            {
                Value = new JwtSecurityTokenHandler().WriteToken(jwtSecruityToken),
                ExpiresAt = jwtSecruityToken.ValidTo
            };
        }
    }
}
