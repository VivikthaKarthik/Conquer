using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string ThumbNail { get; set; } = null!;

    public virtual ICollection<PortfolioImage> PortfolioImages { get; set; } = new List<PortfolioImage>();
}
