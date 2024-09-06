namespace InteriorDesignWebAPI.Models.Dtos
{
    public class UpdateWorkOrderPartDto
    {
        public int? WorkOrderPartId { get; set; }
        public int WorkOrderId { get; set; }
        public string Height { get; set; }
        public string Width { get; set; }
        public string Notes { get; set; }
        public string WorkOrderTypeId { get; set; }
        public List<UpdateWorkOrderPropertyDto> Properties { get; set; }
    }

    public class UpdateWorkOrderPropertyDto
    {
        public string PropertyName { get; set; }
        public string PropertyFieldName { get; set; }
    }
}
