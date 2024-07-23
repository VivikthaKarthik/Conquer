using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IRoomService
    {
        Task<ResponseDto> GetRoomById(int id);
        Task<ResponseDto> GetRoomsByProjectId(int projectId);
        Task<ResponseDto> CreateRoomAsync(RoomDto data);
        Task<ResponseDto> UpdateRoomAsync(RoomDto data);
        Task<ResponseDto> DeleteRoom(int id);
    }
}
