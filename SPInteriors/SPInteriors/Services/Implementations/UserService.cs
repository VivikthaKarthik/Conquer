using SPInteriors.Services.Interfaces;
using SPInteriors.Utilities;

namespace SPInteriors.Services.Implementations
{
    public class UserService : IUserService
    {
        public UserRoles UserType { get; set; } = UserRoles.Unknown;

        public async Task<bool> Login()
        {
            UserType = UserRoles.Admin;
            return true;
        }
    }
}
