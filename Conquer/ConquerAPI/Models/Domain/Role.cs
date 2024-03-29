﻿using System;
using System.Collections.Generic;

namespace ConquerAPI.Models.Domain;

public partial class Role
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; } = new List<User>();
}
