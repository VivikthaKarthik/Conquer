using ConquerAPI.Models.Domain;

namespace ConquerAPI.Repositories.Interfaces
{
    public interface ICallVolumeRepository
    {
        Task<List<CallVolume>> GetAllCallVolume();
        Task<CallVolume> GetCallVolumeById(string itemId);
        Task<CallVolume> CreateCallVolume(CallVolume newItem);
        Task<CallVolume> UpdateCallVolume(CallVolume updatedItem);
        Task<bool> DeleteCallVolume(string itemId);
    }
}
