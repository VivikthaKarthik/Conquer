using InteriorDesignWebAPI.Models.Domain;

namespace InteriorDesignWebAPI.Models.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; } = null!;

        public string ThumbNail { get; set; } = null!;

        public IFormFile Image { get; set; } = null!;

        public IFormFileCollection Images { get; set; } = null!;

        public virtual ICollection<PortfolioImage> PortfolioImages { get; set; } = new List<PortfolioImage>();
    }
}
