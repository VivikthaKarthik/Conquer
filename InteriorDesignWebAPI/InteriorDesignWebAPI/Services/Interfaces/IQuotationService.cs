using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IQuotationService
    {
        Task<ResponseDto> GetQuotationByIdAsync(int projectId);
        Task<ResponseDto> GetPartTypesAsync();
    }
}
