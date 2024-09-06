using InteriorDesignWebAPI.Models.Dtos;
using Microsoft.AspNetCore.Components.Forms;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IFileUploadService
    {
       
        Task<ResponseDto> SavePortfolioImageAsync(IBrowserFile file, int id);
    }
}
