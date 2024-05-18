using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;

namespace SPInteriors.Services.Implementations
{
    public class PortfolioService : IPortfolioService
    {
        private readonly SpinteriorsContext dbContext;
        public PortfolioService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public async Task<List<CategoryDto>> GetCategoriesListAsync()
        {
            List<CategoryDto> list = new List<CategoryDto>();

            if (dbContext.Categories.Any())
            {
                var listItems = dbContext.Categories.ToList();

                foreach (var data in listItems)
                {
                    CategoryDto category = new CategoryDto();
                    category.Id = data.Id;
                    category.Name = data.Name;
                    category.ImagePath = data.ThumbNail;
                    category.Description = data.Description;

                    list.Add(category);
                }
            }
            return list;
        }


        public async Task<List<PortfolioImageDto>> GetImagesListAsync(int categoryId)
        {
            List<PortfolioImageDto> list = new List<PortfolioImageDto>();

            if (dbContext.PortfolioImages.Any(x=>x.CategoryId  == categoryId))
            {
                var listItems = dbContext.PortfolioImages.Where(x => x.CategoryId == categoryId).ToList();

                foreach (var data in listItems)
                {
                    PortfolioImageDto image = new PortfolioImageDto();
                    image.Id = data.Id;
                    image.Name = data.Name;
                    image.ImagePath = data.ImagePath;
                    image.Description = data.Description;
                    image.categoryId = data.CategoryId;


                    list.Add(image);
                }
            }
            return list;
        }

        public async Task<bool> CreateCategoryAsync(CategoryDto data)
        {
            try
            {
                Models.Domain.Category category = new Models.Domain.Category();

                if (data != null)
                {
                    category.Name = data.Name;
                    category.Description = data.Description;
                    category.ThumbNail = data.ImagePath;
                    dbContext.Categories.Add(category);
                    await dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

    }
}
