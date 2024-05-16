using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IRoomService
    {
        Task<RoomDto> GetRoomListByIdAsync(int id);
        Task<List<RoomDto>> GetRoomListAsync(int projectId);
        Task<bool> CreateRoomAsync(RoomDto data);
        Task<bool> UpdateRoomAsync(RoomDto data);
    }
}
