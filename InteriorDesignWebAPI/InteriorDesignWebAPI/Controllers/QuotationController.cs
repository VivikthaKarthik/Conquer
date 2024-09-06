using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class QuotationController : ControllerBase
    {
        private readonly IQuotationService quotationService;
        private readonly ILogger<QuotationController> logger;

        public QuotationController(IQuotationService _quotationService, ILogger<QuotationController> _logger)
        {
            quotationService = _quotationService;
            logger = _logger;
        }


        [HttpGet]
        [Route("api/Quotation/GetQuotationByIdAsync")]
        public async Task<ResponseDto> GetQuotationByIdAsync(int projectId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetQuotationByIdAsync");
                return await quotationService.GetQuotationByIdAsync(projectId);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Quotation/GetPartTypesAsync")]
        public async Task<ResponseDto> GetPartTypesAsync()
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetPartTypesAsync");
                return await quotationService.GetPartTypesAsync();
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
