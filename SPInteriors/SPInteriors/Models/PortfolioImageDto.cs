namespace SPInteriors.Models
{
    public class PortfolioImageDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int categoryId { get; set; }
        public string ImagePath { get; set; }
    }
}
