using SPInteriors.Utilities;

namespace SPInteriors.Services.Interfaces
{
    public interface IUserService
    {
        public UserRoles UserType { get; set; }

        Task<bool> Login();
    }
}
