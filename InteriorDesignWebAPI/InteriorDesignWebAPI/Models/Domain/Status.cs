using System;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Models.Domain;

public partial class Status
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
}
