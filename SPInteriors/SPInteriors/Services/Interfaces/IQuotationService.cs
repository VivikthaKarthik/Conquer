using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IQuotationService
    {
        Task<List<QuotationDto>> GetQuotationListAsync();
        Task<List<QuotationDto>> GetQuotationListAsync(string clietnName);
        Task<QuotationDto> GetQuotationByIdAsync(int id);
    }
}
