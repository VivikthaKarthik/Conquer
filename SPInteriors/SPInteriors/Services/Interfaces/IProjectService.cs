using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IProjectService
    {
        Task<ProjectDto> GetProjectByIdAsync(int id);
        Task<List<ProjectDto>> GetProjectListAsync();
        Task<List<ProjectDto>> GetProjectListAsync(string clietnName, int statusId);

        Task<bool> CreateProjectAsync(ProjectDto data);
    }
}
