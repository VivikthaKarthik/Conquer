namespace InteriorDesignWebAPI.Models.Dtos
{
    public class WorkSheetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoomTypeId { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int MaterialTypeId { get; set; }
        public string Material { get; set; }
        public int OuterFrameTypeId { get; set; }
        public string OuterFrame { get; set; }

        public string AccordionTag
        {
            get
            {
                return Name.Replace(" ", "");
            }
        }
        public string WorkBookTag
        {
            get
            {
                return Id.ToString() + "_" + Name.Replace(" ", "");
            }
        }
        public string ImagePath { get; set; }
        public List<WorkOrderDto> WorkOrders { get; set; }
    }
}
