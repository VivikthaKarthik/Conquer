using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InteriorDesignWebAPI.Services
{
    public class ExplorerService : IExplorer
    {

        private readonly InteriorDesignContext dbContext;
        private readonly IMapper mapper;
        private CategoryDto category;
        private readonly IWebHostEnvironment _environment;
        public ExplorerService(InteriorDesignContext _dbContext, IMapper _mapper, IWebHostEnvironment environment)
        {
            dbContext = _dbContext;
            mapper = _mapper;
            _environment = environment;

        }





        public async Task<ResponseDto> GetAllCategoriesAsync()
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var categoties = await dbContext.Categories.ToListAsync();

                if (categoties != null && categoties.Any())
                    response.Result = mapper.Map<List<CategoryDto>>(categoties);
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

        public async Task<ResponseDto> GetPortfolioImagesAsync(int categoryId)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var images = await dbContext.PortfolioImages.Where(x => x.CategoryId == categoryId).ToListAsync();

                if (images != null)
                    response.Result = mapper.Map<List<PortfolioImageDto>>(images);
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



        public async Task<ResponseDto> CreateCategoryAsync(CategoryDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var category = mapper.Map<Category>(data);
                    dbContext.Categories.Add(category);

                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = "Category Inserted Successfully";
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

        public async Task<ResponseDto> SaveImage([FromForm] CategoryDto dto)
        {
            ResponseDto response = new ResponseDto();
            try
            {

                if (dto.Image != null)
                {
                    var uploadsFolderPath = Path.Combine("ImageVault\\Portfolio", "");
                    var uniqueFileName = "ImageVault\\\\Portfolio\\" + Guid.NewGuid().ToString() + "_" + dto.Image.FileName;
                    var filePath = Path.Combine("C:\\GIT\\Cordova\\spinteriors\\www", uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(fileStream);
                    }

                    // Save name, description, and filePath to the database
                    var categoryDetails = new CategoryDto
                    {
                        Name = dto.Name,
                        Description = dto.Description,
                        ThumbNail = uniqueFileName
                    };

                    var category = mapper.Map<Category>(categoryDetails);
                    dbContext.Categories.Add(category);

                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = "Category Inserted Successfully";


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

        public async Task<ResponseDto> SaveMultipleImages([FromForm] CategoryDto dto)
        {
            ResponseDto response = new ResponseDto();
            var imagePaths = new List<string>();

            try
            {

                if (dto.Image != null)
                {
                    var uploadPath = Path.Combine(_environment.WebRootPath, "uploads");
                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }
                    foreach (var image in dto.Images)
                    {
                        if (image.Length > 0)
                        {
                            var fileName = Path.GetFileName(image.FileName);
                            var filePath = Path.Combine(uploadPath, fileName);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await image.CopyToAsync(stream);
                            }
                            imagePaths.Add(filePath);
                        }
                    }
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
    }
}





    

