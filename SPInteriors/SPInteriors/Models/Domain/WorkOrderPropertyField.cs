using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class WorkOrderPropertyField
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int WorkOrderPropertyId { get; set; }

    public virtual WorkOrderProperty WorkOrderProperty { get; set; } = null!;
}
