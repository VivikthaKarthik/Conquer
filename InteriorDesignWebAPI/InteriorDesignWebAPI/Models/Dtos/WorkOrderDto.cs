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

        public bool SuppressCalculation { get; set; }

        public int? Amount { get; set; }

        public int TotalSftInFeet
        {
            get
            {
                return Convert.ToInt32(Math.Floor(Height * Width));
            }
        }

        public decimal TotalSftInInch
        {
            get
            {
                var inches = Convert.ToInt32((Height * Width - TotalSftInFeet) * 100);

                if (inches > 12)
                    inches = inches / 10;
                return inches;
            }
        }

        public int HeightInFeet { get; set; }

        public int WidthInFeet { get; set; }

        public int HeightInInch { get; set; }

        public int WidthInInch { get; set; }
        public string ImagePath { get; set; }

        public List<WorkOrderPartDto> Parts { get; set; }
    }
}
