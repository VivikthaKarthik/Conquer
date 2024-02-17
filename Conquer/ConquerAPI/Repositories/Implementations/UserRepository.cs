using ConquerAPI.Models.Domain;
using ConquerAPI.Repositories.Interfaces;
using ConquerAPI.Services.Interfaces;

namespace ConquerAPI.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly ConquerContext dbContext;
        private readonly IUserService userService;
        public UserRepository(ConquerContext _dbContext, IUserService _userService)
        {
            dbContext = _dbContext;
            userService = _userService;
        }

        public async Task<User> GetUser(string userId)
        {
            return await Task.FromResult(dbContext.Users.FirstOrDefault(item => item.UserId == userId));
        }

        public async Task<User> CreateUser(User newItem)
        {
            var currentUser = userService.GetCurrentUser();

            if (currentUser != null)
            {
                newItem.UserId = Guid.NewGuid().ToString();
                newItem.CreatedBy = newItem.UpdatedBy = currentUser.Name;
                newItem.CreatedDate = newItem.UpdateDate = DateTime.Now;
                newItem.IsActive = true;
                dbContext.Users.Add(newItem);
                await dbContext.SaveChangesAsync();
            }
            return newItem;
        }

        public async Task<bool> DeleteUser(string userId)
        {
            var currentUser = userService.GetCurrentUser();
            var existingItem = dbContext.Users.FirstOrDefault(item => item.UserId == userId);

            if (existingItem != null)
            {
                existingItem.IsActive = false;
                existingItem.UpdatedBy = currentUser.Name;
                existingItem.UpdateDate = DateTime.Now;

                await dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                throw new Exception("Not Found");
            }
        }

        public async Task<User> UpdateUser(User updatedItem)
        {
            var currentUser = userService.GetCurrentUser();
            var existingItem = dbContext.Users.FirstOrDefault(item => item.UserId == updatedItem.UserId);

            if (existingItem != null)
            {                
                if(updatedItem.RoleId != existingItem.RoleId && !dbContext.Roles.Any(x => x.Id == updatedItem.RoleId))
                {
                    throw new Exception("Role does not exist");
                }

                existingItem.UserName = updatedItem.UserName;
                existingItem.Email = updatedItem.Email;
                existingItem.RoleId = updatedItem.RoleId;
                existingItem.UpdatedBy = currentUser.Name;
                existingItem.UpdateDate = DateTime.Now;

                await dbContext.SaveChangesAsync();
                return updatedItem;
            }
            else
            {
                throw new Exception("Not Found");
            }
        }
    }
}
