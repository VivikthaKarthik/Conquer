using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class WorkOrderItem
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? ImagePath { get; set; }

    public virtual ICollection<DesignType> DesignTypes { get; set; } = new List<DesignType>();

    public virtual ICollection<WorkOrder> WorkOrders { get; set; } = new List<WorkOrder>();
}
