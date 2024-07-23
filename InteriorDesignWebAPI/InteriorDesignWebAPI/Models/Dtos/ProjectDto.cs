namespace InteriorDesignWebAPI.Models.Dtos
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int ClientId { get; set; }
        public int StatusId { get; set; }
        public int HouseTypeId { get; set; }
        public int MaterialTypeId { get; set; }
        public int OuterFrameTypeId { get; set; }
        public string ClientName { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string HouseType { get; set; }
        public string ImagePath { get; set; }
        public int MaterialId { get; set; }
        public string Material { get; set; }
        public int OuterFrameId { get; set; }
        public string OuterFrame { get; set; }
        public int? Area { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
