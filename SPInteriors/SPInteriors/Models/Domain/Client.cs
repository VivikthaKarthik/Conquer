using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class Client
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string MobileNumber { get; set; } = null!;

    public string? Email { get; set; }

    public string? Address { get; set; }

    public bool IsActive { get; set; }
}
