using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;
using System.Net.NetworkInformation;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SPInteriors.Services.Implementations
{
    public class ProjectService : IProjectService
    {
        private readonly SpinteriorsContext dbContext;
        //private readonly IMapper mapper;
        public ProjectService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            //mapper = _mapper;
        }

        public async Task<ProjectDto> GetProjectByIdAsync(int id)
        {
            ProjectDto project = new ProjectDto();

            if (dbContext.VwProjects.Any(x => x.Id == id))
            {
                var data = dbContext.VwProjects.First(x => x.Id == id);
                project.Id = data.Id;
                project.Name = data.Name;
                project.ClientId = data.ClientId;
                project.ClientName = data.ClientName;
                project.StatusId = data.StatusId;
                project.Status = data.Status;
                project.HouseType = data.HouseType;
                project.HouseTypeId = data.HouseTypeId;
                project.ImagePath = data.ImagePath;
                project.Material = data.MaterialType;
                project.MaterialId = data.MaterialTypeId;
                project.OuterFrame = data.OuterFrameType;
                project.OuterFrameId = data.OuterFrameTypeId;
            }
            return project;
        }

        public async Task<List<ProjectDto>> GetProjectListAsync()
        {
            List<ProjectDto> list = new List<ProjectDto>();
            var listItems = dbContext.VwProjects.ToList();

            foreach(var item in listItems)
            {
                ProjectDto project = new ProjectDto();
                project.Id = item.Id;
                project.Name = item.Name;
                project.ClientId = item.ClientId;
                project.ClientName = item.ClientName;
                project.StatusId = item.StatusId;
                project.Status = item.Status;
                project.HouseType = item.HouseType;
                project.ImagePath = item.ImagePath;
                project.HouseTypeId = item.HouseTypeId;
                list.Add(project);
            }
            return list;
        }

        public async Task<List<ProjectDto>> GetProjectListAsync(string clietnName, int statusId)
        {
            var projects = await GetProjectListAsync();

            if(!string.IsNullOrEmpty(clietnName))
                projects = projects.Where(x => x.ClientName.ToLower().Contains(clietnName.ToLower())).ToList();
            if (statusId > 0)
                projects = projects.Where(x => x.StatusId == statusId).ToList();

            return projects;
        }

        public async Task<bool> CreateProjectAsync(ProjectDto data)
        {
            try
            {
                if (!dbContext.Projects.Any(x => x.Id == data.Id))
                {
                    Models.Domain.Project project = new Models.Domain.Project();

                    if (data != null)
                    {
                        project.Name = data.Name;
                        project.ClientId = data.ClientId;
                        project.StatusId = data.StatusId;
                        project.HouseTypeId = data.HouseTypeId;
                        project.MaterialTypeId = data.MaterialId;
                        project.OuterFrameTypeId = data.OuterFrameId;

                        dbContext.Projects.Add(project);
                        await dbContext.SaveChangesAsync();
                    }
                }
                else
                {
                    await UpdateProjectAsync(data);
                }
            }
            catch (Exception ex)
            {

            }
            return true;
        }


        public async Task<bool> UpdateProjectAsync(ProjectDto data)
        {
            try
            {
                if (dbContext.Projects.Any(x => x.Id == data.Id))
                {
                    Models.Domain.Project project = dbContext.Projects.First(x => x.Id == data.Id);

                    if (data != null)
                    {
                        project.Name = data.Name;
                        project.ClientId = data.ClientId;
                        project.StatusId = data.StatusId;
                        project.HouseTypeId = data.HouseTypeId;
                        project.MaterialTypeId = data.MaterialId;
                        project.OuterFrameTypeId = data.OuterFrameId;
                        await dbContext.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return true;
        }
    }
}
