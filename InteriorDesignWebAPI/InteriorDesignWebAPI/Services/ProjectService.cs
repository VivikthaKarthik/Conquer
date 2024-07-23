using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InteriorDesignWebAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly InteriorDesignContext dbContext;
        private readonly IMapper mapper;

        public ProjectService(InteriorDesignContext _dbContext, IMapper _mapper)
        {
            dbContext = _dbContext;
            mapper = _mapper;
        }

        public async Task<ResponseDto> GetProjectByIdAsync(long id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var project = await dbContext.VwProjects.FirstOrDefaultAsync(x => x.Id == id);

                if (project != null)
                    response.Result = mapper.Map<ProjectDto>(project);
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> GetAllProjectsAsync()
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var projects = await dbContext.VwProjects.ToListAsync();

                if (projects != null && projects.Any())
                    response.Result = mapper.Map<List<ProjectDto>>(projects);
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> GetFilteredProjectsAsync(string ClientName, int statusId)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                List<VwProject> projects = await dbContext.VwProjects.ToListAsync();

                if (!string.IsNullOrEmpty(ClientName))
                    projects = projects.Where(x => x.ClientName.ToLower().Contains(ClientName.ToLower())).ToList();
                if (statusId > 0)
                    projects = projects.Where(x => x.StatusId == statusId).ToList();

                if (projects != null && projects.Any())
                    response.Result = mapper.Map<List<ProjectDto>>(projects);
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        
        public async Task<ResponseDto> GetMyProjectsAsync(int clientId)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                List<VwProject> projects = await dbContext.VwProjects.Where(x => x.ClientId == clientId).ToListAsync();

                if (projects != null && projects.Any())
                    response.Result = mapper.Map<List<ProjectDto>>(projects);
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> CreateProjectAsync(ProjectDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var project = mapper.Map<Project>(data);
                    dbContext.Projects.Add(project);

                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = "Project Inserted Successfully";
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Invalid Request";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> UpdateProjectAsync(ProjectDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var project = dbContext.Projects.First(x => x.Id == data.Id);

                    if (project != null)
                    {
                        project = mapper.Map<Project>(data);

                        await dbContext.SaveChangesAsync();
                        response.IsSuccess = true;
                        response.Message = "Project Updated Successfully";
                    }
                    else
                    {
                        response.IsSuccess = false;
                        response.Message = "Project Not Found";
                    }
                }
                else
                {
                    response.IsSuccess = true;
                    response.Message = "Invalid Request";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ex.Message;
            }
            return response;
        }

    }
}
