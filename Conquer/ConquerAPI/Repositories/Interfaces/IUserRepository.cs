using Conquer.Models.Domain;

namespace ConquerAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUser(string userId);
        Task<User> CreateUser(User newItem);
        Task<User> UpdateUser(User updatedItem);
        Task<bool> DeleteUser(string userId);
    }
}
