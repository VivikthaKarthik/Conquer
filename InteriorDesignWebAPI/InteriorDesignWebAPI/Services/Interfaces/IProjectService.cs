using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ResponseDto> GetProjectByIdAsync(long id);
        Task<ResponseDto> GetAllProjectsAsync();
        Task<ResponseDto> GetFilteredProjectsAsync(string ClientName, int statusId);
        Task<ResponseDto> GetMyProjectsAsync(int clientId);
        Task<ResponseDto> CreateProjectAsync(ProjectDto data);
        Task<ResponseDto> UpdateProjectAsync(ProjectDto data);
    }
}
