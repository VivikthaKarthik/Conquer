using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int ClientId { get; set; }
    public int StatusId { get; set; }
    public int HouseTypeId { get; set; }
    public int MaterialTypeId { get; set; }
    public int OuterFrameTypeId { get; set; }
    public int? Area { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public bool IsActive { get; set; }

    public virtual ICollection<Quotation> Quotations { get; set; } = new List<Quotation>();
    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
