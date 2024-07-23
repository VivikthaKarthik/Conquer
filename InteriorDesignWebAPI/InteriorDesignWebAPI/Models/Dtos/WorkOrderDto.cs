namespace InteriorDesignWebAPI.Models.Dtos
{
    public class WorkOrderDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public int? WorkOrderItemId { get; set; }

        public string WorkOrderItem { get; set; } = null!;

        public string? WorkOrderType { get; set; }

        public int RoomId { get; set; }

        public int RoomTypeId { get; set; }

        public string Room { get; set; } = null!;

        public string? DesignType { get; set; }

        public string? OuterFrameType { get; set; }

        public string? MaterialType { get; set; }

        public decimal Height { get; set; }

        public decimal Width { get; set; }

        public bool SuppressCalculation { get; set; }

        public int? Amount { get; set; }
    }
}
