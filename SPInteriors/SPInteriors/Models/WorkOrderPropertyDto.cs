namespace SPInteriors.Models
{
    public class WorkOrderPropertyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool AllowMultipleSelect { get; set; }
        public List<WorkOrderDetailsDto> SelectedValues { get; set; }
        public List<WorkOrderPropertyFieldDto> Fields { get; set; }

        public WorkOrderPropertyDto()
        {
            SelectedValues = new List<WorkOrderDetailsDto>();
            Fields = new List<WorkOrderPropertyFieldDto>();
        }
    }

    public class WorkOrderPropertyFieldDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
