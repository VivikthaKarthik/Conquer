using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IWorkSheetService
    {
        Task<ResponseDto> GetWorkSheetByIdAsync(int projectId);
        Task<ResponseDto> GetImageData(string imagePath);
    }
}
