using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class VwProject
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int ClientId { get; set; }

    public string ClientName { get; set; } = null!;

    public int StatusId { get; set; }

    public string Status { get; set; } = null!;

    public int HouseTypeId { get; set; }

    public string HouseType { get; set; } = null!;

    public string ImagePath { get; set; } = null!;

    public int MaterialTypeId { get; set; }

    public string MaterialType { get; set; } = null!;

    public int OuterFrameTypeId { get; set; }

    public string OuterFrameType { get; set; } = null!;

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }
}
