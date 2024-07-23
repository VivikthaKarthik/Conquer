using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using InteriorDesignWebAPI.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService projectService;
        private readonly ILogger<ProjectController> logger;

        public ProjectController(IProjectService _projectService, ILogger<ProjectController> _logger)
        {
            projectService = _projectService;
            logger = _logger;
        }

        [HttpGet]
        [Route("api/Project/GetProjectById")]
        public async Task<ResponseDto> GetProjectById(int Id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetProjectById");
                return await projectService.GetProjectByIdAsync(Id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Project/GetAllProjects")]
        public async Task<ResponseDto> GetAllProjects()
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetAllProjects");
                return await projectService.GetAllProjectsAsync();
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Project/GetFilteredProjects")]
        public async Task<ResponseDto> GetFilteredProjects(string? ClientName, int statusId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetFilteredProjects");
                return await projectService.GetFilteredProjectsAsync(ClientName, statusId);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Project/GetMyProjects")]
        public async Task<ResponseDto> GetMyProjects(int clientId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetMyProjects");
                return await projectService.GetMyProjectsAsync(clientId);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/Project/CreateProject")]
        public async Task<ResponseDto> CreateProject(ProjectDto project)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested CreateProject");
                return await projectService.CreateProjectAsync(project);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPut]
        [Route("api/Project/UpdateProject")]
        public async Task<ResponseDto> UpdateProject(ProjectDto project)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested UpdateProject");
                return await projectService.UpdateProjectAsync(project);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

    }
}
