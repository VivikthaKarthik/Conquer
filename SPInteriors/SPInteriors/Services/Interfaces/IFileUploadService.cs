using Microsoft.AspNetCore.Components.Forms;

namespace SPInteriors.Services.Interfaces
{
    public interface IFileUploadService
    {
        Task<string> SaveWorkOrderImageAsync(IBrowserFile file, int id);
        Task<string> SavePortfolioImageAsync(IBrowserFile file, int id);
    }
}
