using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class VwRoom
{
    public int Id { get; set; }

    public int RoomTypeId { get; set; }

    public string Name { get; set; } = null!;

    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public int MaterialTypeId { get; set; }

    public string MaterialType { get; set; } = null!;

    public int OuterFrameTypeId { get; set; }

    public string OuterFrameType { get; set; } = null!;
}
