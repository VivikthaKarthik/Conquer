using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class DesignType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int WorkOrderItemId { get; set; }

    public string Description { get; set; } = null!;

    public virtual WorkOrderItem WorkOrderItem { get; set; } = null!;
}
