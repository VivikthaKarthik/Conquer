using System;
using System.Collections.Generic;

namespace Conquer.Models.Domain;

public partial class Employee
{
    public long Id { get; set; }

    public string EmployeeId { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public string UpdatedBy { get; set; } = null!;

    public DateTime UpdateDate { get; set; }

    public virtual User User { get; set; } = null!;
}
