using ConquerAPI.DTOs;

namespace ConquerAPI.Services.Interfaces
{
    public interface IUserService
    {
        CurrentUser GetCurrentUser();
    }
}
