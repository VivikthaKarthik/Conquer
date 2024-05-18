using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IPortfolioService
    {
        Task<List<CategoryDto>> GetCategoriesListAsync();
        Task<List<PortfolioImageDto>> GetImagesListAsync(int categoryId);
        Task<bool> CreateCategoryAsync(CategoryDto data);
    }
}
