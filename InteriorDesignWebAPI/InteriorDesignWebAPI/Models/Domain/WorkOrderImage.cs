using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class WorkOrderImage
{
    public int Id { get; set; }

    public int WorkOrderId { get; set; }

    public string Name { get; set; } = null!;

    public string ImagePath { get; set; } = null!;

    public string UploadedBy { get; set; } = null!;

    public bool IsFinal { get; set; }

    public virtual WorkOrder WorkOrder { get; set; } = null!;
}
