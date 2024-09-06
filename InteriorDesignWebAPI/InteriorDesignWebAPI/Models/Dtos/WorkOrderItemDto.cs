namespace InteriorDesignWebAPI.Models.Dtos
{
    public class WorkOrderItemDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public int WorkOrderId { get; set; }
        public int RoomTypeId { get; set; }
        public IFormFile Image { get; set; } = null!;
    }
}
