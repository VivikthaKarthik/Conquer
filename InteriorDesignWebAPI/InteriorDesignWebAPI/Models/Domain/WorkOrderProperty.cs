using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class WorkOrderProperty
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool AllowMultipleSelect { get; set; }

    public virtual ICollection<WorkOrderPropertyField> WorkOrderPropertyFields { get; set; } = new List<WorkOrderPropertyField>();
}
