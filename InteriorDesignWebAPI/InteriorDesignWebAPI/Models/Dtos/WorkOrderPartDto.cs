namespace InteriorDesignWebAPI.Models.Dtos
{
    public class WorkOrderPartDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int WorkOrderId { get; set; }

        public int WorkOrderTypeId { get; set; }
        public string WorkOrderType { get; set; }

        public decimal Height
        {
            get
            {
                var inches = HeightInInch;
                if (HeightInInch > 12)
                    inches = HeightInInch / 10;
                return HeightInFeet + (Convert.ToDecimal(inches) / 10);
            }
            set
            {
                HeightInFeet = Convert.ToInt32(Math.Floor(value));
                HeightInInch = Convert.ToInt32((value - HeightInFeet) * 100);

                if (HeightInInch > 12)
                    HeightInInch = HeightInInch / 10;
            }
        }

        public decimal Width
        {
            get
            {
                var inches = WidthInInch;
                if (WidthInInch > 12)
                    inches = WidthInInch / 10;

                return WidthInFeet + (Convert.ToDecimal(inches) / 10);
            }
            set
            {
                WidthInFeet = Convert.ToInt32(Math.Floor(value));
                WidthInInch = Convert.ToInt32((value - WidthInFeet) * 100);

                if (WidthInInch > 12)
                    WidthInInch = WidthInInch / 10;
            }
        }

        public decimal TotalSft
        {
            get
            {
                return Height * Width;
            }
        }

        public string? Notes { get; set; }
        public string WorkOrderItem { get; set; }

        public string ImagePath { get; set; }

        public RoomDto Room { get; set; }

        public int HeightInFeet { get; set; }

        public int WidthInFeet { get; set; }

        public int HeightInInch { get; set; }

        public int WidthInInch { get; set; }

        public List<WorkOrderDetailsDto> Details { get; set; }
    }
}
