using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class DucoPaintType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Price { get; set; }
}
