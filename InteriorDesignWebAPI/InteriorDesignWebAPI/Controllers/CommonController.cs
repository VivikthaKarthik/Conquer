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
    public class CommonController : ControllerBase
    {

        private readonly ICommonService commonService;
        private readonly ILogger<CommonController> logger;

        public CommonController(ICommonService _commonService, ILogger<CommonController> _logger)
        {
            commonService = _commonService;
            logger = _logger;
        }


        [HttpGet]
        [Route("api/Common/GetMainMenu")]
        public async Task<ResponseDto> GetMainMenu(string pageName)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetMainMenu");
                return await commonService.GetMainMenu(pageName);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Common/GetDropdownData")]
        public async Task<ResponseDto> GetDropdownData(string tableName, string? parentName, int? parentId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetDropdownData");
                return await commonService.GetListItems(tableName, parentName, parentId);
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
