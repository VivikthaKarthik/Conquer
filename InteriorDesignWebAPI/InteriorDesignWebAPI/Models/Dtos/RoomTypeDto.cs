namespace InteriorDesignWebAPI.Models.Dtos
{
    public class RoomTypeDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; } = null!;
    }
}
