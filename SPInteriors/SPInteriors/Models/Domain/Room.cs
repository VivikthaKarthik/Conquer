using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class Room
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int MaterialTypeId { get; set; }

    public int OuterFrameTypeId { get; set; }

    public int ProjectId { get; set; }

    public bool IsActive { get; set; }

    public virtual Project Project { get; set; } = null!;

    public virtual ICollection<WorkOrder> WorkOrders { get; set; } = new List<WorkOrder>();
}
