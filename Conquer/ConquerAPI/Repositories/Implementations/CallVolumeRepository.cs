using Conquer.Models.Domain;
using ConquerAPI.Repositories.Interfaces;
using ConquerAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace ConquerAPI.Repositories.Implementations
{
    public class CallVolumeRepository : ICallVolumeRepository
    {
        private readonly ConquerContext dbContext;
        private readonly IUserService userService;
        public CallVolumeRepository(ConquerContext _dbContext, IUserService _userService)
        {
            dbContext = _dbContext;
            userService = _userService;
        }

        public async Task<List<CallVolume>> GetAllCallVolume()
        {
            var currentUser = userService.GetCurrentUser();
            return await Task.FromResult(dbContext.CallVolumes.Where(X => X.AllocatedTo == currentUser.UserId).ToList());
        }

        public async Task<CallVolume> GetCallVolumeById(string itemId)
        {
            return await Task.FromResult(dbContext.CallVolumes.FirstOrDefault(item => item.CallVolumeId == itemId));
        }

        public async Task<CallVolume> CreateCallVolume(CallVolume newItem)
        {
            var currentUser = userService.GetCurrentUser();

            if (currentUser != null)
            {
                newItem.CallVolumeId = Guid.NewGuid().ToString();
                newItem.CreatedBy = newItem.UpdatedBy = currentUser.Name;
                newItem.CreatedDate = newItem.UpdateDate = DateTime.Now;
                dbContext.CallVolumes.Add(newItem);
                await dbContext.SaveChangesAsync();
            }
            return newItem;
        }

        public async Task<CallVolume> UpdateCallVolume(CallVolume updatedItem)
        {
            var currentUser = userService.GetCurrentUser();
            var existingItem = dbContext.CallVolumes.FirstOrDefault(item => item.CallVolumeId == updatedItem.CallVolumeId);

            if (existingItem != null)
            {
                existingItem.CustomerName = updatedItem.CustomerName;
                existingItem.Email = updatedItem.Email;
                existingItem.PhoneNumber = updatedItem.PhoneNumber;
                existingItem.AccountNumber = updatedItem.AccountNumber;
                existingItem.AllocatedTo = updatedItem.AllocatedTo;
                existingItem.CardNumber = updatedItem.CardNumber;
                existingItem.LastPaidAmount = updatedItem.LastPaidAmount;
                existingItem.LastPaidDate = updatedItem.LastPaidDate;
                existingItem.OutStanding = updatedItem.OutStanding;
                existingItem.Pan = updatedItem.Pan;
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

        public async Task<bool> DeleteCallVolume(string itemId)
        {
            var existingItem = dbContext.CallVolumes.FirstOrDefault(item => item.CallVolumeId == itemId);

            if (existingItem != null)
            {
                dbContext.CallVolumes.Remove(existingItem);
                await dbContext.SaveChangesAsync();

                return await Task.FromResult(true);
            }

            return await Task.FromResult(false);
        }
    }
}
