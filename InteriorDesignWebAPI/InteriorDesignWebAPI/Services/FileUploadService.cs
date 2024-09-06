using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Components.Forms;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InteriorDesignWebAPI.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly InteriorDesignContext dbContext;
        private readonly IWebHostEnvironment _environment;

        public FileUploadService(IWebHostEnvironment environment, InteriorDesignContext _dbContext)
        {
            dbContext = _dbContext;
            _environment = environment;
        }

       
        public async Task<ResponseDto> SavePortfolioImageAsync(IBrowserFile file, int id)
        {

            ResponseDto response = new ResponseDto();
            try
            {
                string name = string.Empty;
                if (id > 0)
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

                response.IsSuccess = true;
                response.Message = "Image Inserted Successfully";
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
