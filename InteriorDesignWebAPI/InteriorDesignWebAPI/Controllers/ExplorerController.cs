using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class ExplorerController : ControllerBase
    {
        private readonly IExplorer explorerService;
        private readonly ILogger<ExplorerController> logger;
        

        public ExplorerController(IExplorer _explorerService, ILogger<ExplorerController> _logger)
        {
            explorerService = _explorerService;
            logger = _logger;
            
        }

        [HttpGet]
        [Route("api/Explorer/GetAllCategories")]
        public async Task<ResponseDto> GetAllCategories()
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetAllCategories");
                return await explorerService.GetAllCategoriesAsync();
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Explorer/GetPortfolioImagesById")]
        public async Task<ResponseDto> GetPortfolioImagesById(int Id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetPortfolioImagesById");
                return await explorerService.GetPortfolioImagesAsync(Id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/Explorer/CreateCategory")]
        public async Task<ResponseDto> CreateCategory(CategoryDto project)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested CreateCategory");
                return await explorerService.CreateCategoryAsync(project);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/Explorer/SaveImage")]
        public async Task<ResponseDto> SaveImage([FromForm] CategoryDto dto)
        {
            ResponseDto responseDto = new ResponseDto();
            if (dto.Image != null)
            {
                try
                {
                    logger.LogInformation("Requested CreateCategory");
                    return await explorerService.SaveImage(dto);
                }
                catch (Exception ex)
                {
                    responseDto.IsSuccess = false;
                    responseDto.Message = ex.Message;
                }
            }

            return responseDto;
        }

        [HttpPost]
        [Route("api/Explorer/SaveImages")]
        public async Task<ResponseDto> SaveImages([FromForm] CategoryDto dto)
        {
            ResponseDto responseDto = new ResponseDto();
            if (dto.Image != null)
            {
                try
                {
                    logger.LogInformation("Requested CreateCategory");
                    return await explorerService.SaveMultipleImages(dto);
                }
                catch (Exception ex)
                {
                    responseDto.IsSuccess = false;
                    responseDto.Message = ex.Message;
                }
            }

            return responseDto;


            
        }

    }
}   
