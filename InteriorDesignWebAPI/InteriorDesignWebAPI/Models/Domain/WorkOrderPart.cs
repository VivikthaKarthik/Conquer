using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class WorkOrderPart
{
    public int Id { get; set; }

    public int WorkOrderId { get; set; }

    public int WorkOrderTypeId { get; set; }

    public decimal Height { get; set; }

    public decimal Width { get; set; }

    public string? Notes { get; set; }
}
