using Microsoft.AspNetCore.Authorization;
using TaskManagement.Enums;

namespace TaskManagement.Attributes
{
    public class HasPermissionAttribute: AuthorizeAttribute
    {
        public HasPermissionAttribute(Permissions permission)
        {
            Policy = permission.ToString();
        }
    }
}
