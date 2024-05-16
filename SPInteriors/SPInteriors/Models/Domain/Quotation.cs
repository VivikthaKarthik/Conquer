using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class Quotation
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int ProjectId { get; set; }

    public int? Amount { get; set; }

    public DateOnly? IssuedDate { get; set; }

    public int Version { get; set; }

    public bool IsActive { get; set; }

    public virtual Project Project { get; set; } = null!;
}
