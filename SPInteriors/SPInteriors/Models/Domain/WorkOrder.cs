using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class WorkOrder
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? WorkOrderItemId { get; set; }

    public string? WorkOrderType { get; set; }

    public int RoomId { get; set; }

    public string? DesignType { get; set; }

    public string? MaterialType { get; set; }

    public string? OuterFrameType { get; set; }

    public decimal Height { get; set; }

    public decimal Width { get; set; }

    public bool SuppressCalculation { get; set; }

    public int? Amount { get; set; }

    public bool? IsActive { get; set; }

    public virtual Room Room { get; set; } = null!;

    public virtual WorkOrderItem? WorkOrderItem { get; set; }
}
