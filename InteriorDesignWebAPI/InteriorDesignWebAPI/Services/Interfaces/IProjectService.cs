using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ResponseDto> GetProjectById(int id);
        Task<ResponseDto> GetRoomsByProjectId(int projectId);
    }
}
