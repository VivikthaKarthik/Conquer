using System;
using System.Collections.Generic;

namespace Conquer.Models.Domain;

public partial class Company
{
    public int CompanyId { get; set; }

    public string Name { get; set; } = null!;

    public int? ParentCompanyId { get; set; }

    public virtual ICollection<Company> InverseParentCompany { get; } = new List<Company>();

    public virtual Company? ParentCompany { get; set; }
}
