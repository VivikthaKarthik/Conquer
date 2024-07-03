using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class WorkOrderDetail
{
    public int Id { get; set; }

    public int WorkOrderId { get; set; }

    public string Name { get; set; } = null!;

    public string Value { get; set; } = null!;
}
