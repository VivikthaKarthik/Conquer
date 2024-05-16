using SPInteriors.Models.Domain;

namespace SPInteriors.Models
{
    public class WorkOrderDto
    {

        public string WorkBookTag
        {
            get
            {
                return Id.ToString() + "_" + Name.Replace(" ", "");
            }
        }
        public int Id { get; set; }

        public string Name { get; set; }

        public int? WorkOrderItemId { get; set; }
        public string WorkOrderItem { get; set; }
        public string WorkOrderType { get; set; }

        public int RoomId { get; set; }
        public string Room { get; set; }
        public string OuterFrameType { get; set; }
        public string DesignType { get; set; }
        public string MaterialType { get; set; }

        public decimal Height
        {
            get
            {
                var inches = HeightInInch;
                if (HeightInInch > 12)
                    inches = HeightInInch / 10;
                return HeightInFeet + (Convert.ToDecimal(inches) / 100);
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

                return WidthInFeet + (Convert.ToDecimal(inches) / 100);
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


        public int HeightInFeet { get; set; }

        public int WidthInFeet { get; set; }

        public int HeightInInch { get; set; }

        public int WidthInInch { get; set; }

    }
}
