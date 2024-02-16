using ConquerAPI.DTOs;

namespace ConquerAPI.Repositories.Interfaces
{
    public interface ILoginRepository
    {
        Task<string> AuthenticateUser(LoginDto user);
    }
}
