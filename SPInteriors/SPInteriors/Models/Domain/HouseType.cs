using System;
using System.Collections.Generic;

namespace SPInteriors.Models.Domain;

public partial class HouseType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string ImagePath { get; set; } = null!;
}
