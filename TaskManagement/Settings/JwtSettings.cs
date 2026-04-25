namespace TaskManagement.Settings
{
    public class JwtSettings
    {
        public const string Section = "Jwt";

        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Key { get; set; }
        public double ExpirationInDays { get; set; }
    }
}
