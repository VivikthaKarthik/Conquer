using InteriorDesignWebAPI.Models.Domain;

namespace InteriorDesignWebAPI.Models.Dtos
{
    public class PortfolioImageDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public string ImagePath { get; set; } = null!;

        public virtual Category Category { get; set; } = null!;
    }
}
