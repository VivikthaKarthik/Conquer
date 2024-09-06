using InteriorDesignWebAPI.Models.Dtos;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IExplorer
    {
        Task<ResponseDto> GetAllCategoriesAsync();
        Task<ResponseDto> GetPortfolioImagesAsync(int categoryId);
        Task<ResponseDto> CreateCategoryAsync(CategoryDto data);

        Task<ResponseDto> SaveImage([FromForm] CategoryDto dto);
        Task<ResponseDto> SaveMultipleImages([FromForm] CategoryDto dto);



    }
}
