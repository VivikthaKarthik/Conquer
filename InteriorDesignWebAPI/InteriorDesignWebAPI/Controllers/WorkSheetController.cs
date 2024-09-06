using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class WorkSheetController : ControllerBase
    {

        private readonly IWorkSheetService workSheetService;
        private readonly ILogger<WorkSheetController> logger;

        public WorkSheetController(IWorkSheetService _workSheetService, ILogger<WorkSheetController> _logger)
        {
            workSheetService = _workSheetService;
            logger = _logger;
        }


        [HttpGet]
        [Route("api/WorkSheet/GetWorkSheetByIdAsync")]
        public async Task<ResponseDto> GetWorkSheetByIdAsync(int projectId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetWorkSheetByIdAsync");
                return await workSheetService.GetWorkSheetByIdAsync(projectId);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/WorkSheet/GetImageData")]
        public async Task<ResponseDto> GetImageData(string imagePath)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetImageData");
                return await workSheetService.GetImageData(imagePath);
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
