using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
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
        [Route("api/Project/Get")]
        public async Task<ResponseDto> Get(int Id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetUser");
                return await projectService.GetProjectById(Id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Project/GetRoomsByProjectId")]
        public async Task<ResponseDto> GetRoomsByProjectId(int projectId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetRooms");
                return await projectService.GetRoomsByProjectId(projectId);
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
