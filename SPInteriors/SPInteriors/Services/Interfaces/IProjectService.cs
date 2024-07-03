using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IProjectService
    {
        Task<CommonResponseDto> GetProjectByIdAsync(int id);
        Task<List<ProjectDto>> GetProjectListAsync();
        Task<CommonResponseDto> GetRoomListAsync(int projectid);
        Task<List<ProjectDto>> GetProjectListAsync(string clietnName, int statusId);

        Task<CommonResponseDto> CreateProjectAsync(ProjectDto data);
    }
}
