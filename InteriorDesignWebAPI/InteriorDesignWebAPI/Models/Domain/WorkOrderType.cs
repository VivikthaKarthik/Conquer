using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class WorkOrderType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? WorkOrderItemId { get; set; }

    public string Description { get; set; } = null!;

    public string? Image { get; set; }

    public int? Price { get; set; }
}
