using SPInteriors.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Components.Forms;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SPInteriors.Models.Domain;

namespace SPInteriors.Services.Implementations
{
    public class FileUploadService : IFileUploadService
    {
        private readonly SpinteriorsContext dbContext;
        private readonly IWebHostEnvironment _environment;

        public FileUploadService(IWebHostEnvironment environment, SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            _environment = environment;
        }

        public async Task<string> SaveWorkOrderImageAsync(IBrowserFile file, int id)
        {
            var uploadPath = Path.Combine(_environment.WebRootPath, "ImageVault");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var actualFilePath = Path.Combine(uploadPath, file.Name);
            string filePath = "ImageVault/" + file.Name;

            using (var stream = new FileStream(actualFilePath, FileMode.Create))
            {
                await file.OpenReadStream().CopyToAsync(stream);
            }

            WorkOrderImage image = new WorkOrderImage();
            image.Name = file.Name;
            image.WorkOrderId = id;
            image.ImagePath = filePath;
            image.UploadedBy = "Admin";

            dbContext.WorkOrderImages.Add(image);
            await dbContext.SaveChangesAsync();

            return filePath;
        }


        public async Task<string> SavePortfolioImageAsync(IBrowserFile file, int id)
        {
            string name = string.Empty;
            if(id > 0)
            {
                name = dbContext.Categories.First(x => x.Id == id).Name;
            }
            var uploadPath = Path.Combine(_environment.WebRootPath, "ImageVault/Portfolio/" + name);

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var actualFilePath = Path.Combine(uploadPath, file.Name);
            string filePath = "ImageVault/Portfolio/" + name + "/" + file.Name;

            using (var stream = new FileStream(actualFilePath, FileMode.Create))
            {
                await file.OpenReadStream().CopyToAsync(stream);
            }

            PortfolioImage image = new PortfolioImage();
            image.Name = file.Name;
            image.CategoryId = id;
            image.ImagePath = filePath;

            dbContext.PortfolioImages.Add(image);
            await dbContext.SaveChangesAsync();

            return filePath;
        }
    }

}
