using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IFileUploadService fileUploadService;
        private readonly ILogger<FileUploadController> logger;

        public FileUploadController(IFileUploadService _fileUploadService, ILogger<FileUploadController> _logger)
        {
            fileUploadService = _fileUploadService;
            logger = _logger;
        }

        [HttpPost]
        [Route("api/FileUpload/UploadImage")]
        public async Task<ResponseDto> UploadImage(IBrowserFile file, int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested CreateCategory");
                return await fileUploadService.SavePortfolioImageAsync(file,id);
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
