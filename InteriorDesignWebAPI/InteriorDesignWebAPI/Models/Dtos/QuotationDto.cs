namespace InteriorDesignWebAPI.Models.Dtos
{
    public class QuotationDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int Version { get; set; }
        public decimal TotalAmount
        {
            get
            {
                if (Rooms != null && Rooms.Count > 0)
                    return Rooms.Sum(x => x.TotalAmount);
                else
                    return 0;
            }
        }
        public ClientAddress Address { get; set; }
        public DateTime IssuedDate { get; set; }
        public DateTime DueDate { get; set; }
        public List<RoomInfo> Rooms { get; set; }

        public List<Material> MaterialsUsed { get; set; }
    }

    public class RoomInfo
    {
        public string RoomName { get; set; }
        public decimal TotalAmount
        {
            get
            {
                if (WorkOrders != null && WorkOrders.Count > 0)
                    return WorkOrders.Sum(x => x.TotalPrice);
                else
                    return 0;
            }
        }
        public List<WorkOrderInfo> WorkOrders { get; set; }
    }

    public class WorkOrderInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string WorkOrderItem { get; set; }
        public string WorkOrderType { get; set; }
        public bool SuppressCalculation { get; set; }
        public int Amount { get; set; }
        public int Quantity { get; set; } = 1;
        public decimal UnitPrice { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }


        public List<WorkOrderPartDto> Parts { get; set; }
        public decimal TotalPrice
        {
            get
            {
                return this.UnitPrice * Quantity;
            }
        }
    }

    public class ClientAddress
    {
        public string Title { get; set; }
        public string ClientName { get; set; }
        public string FirstAddress { get; set; }
        public string SecondAddress { get; set; }
    }

    public class Material
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
