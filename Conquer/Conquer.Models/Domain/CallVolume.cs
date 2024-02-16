using System;
using System.Collections.Generic;

namespace Conquer.Models.Domain;

public partial class CallVolume
{
    public long Id { get; set; }

    public string CallVolumeId { get; set; } = null!;

    public string? CustomerName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public string? Pan { get; set; }

    public string? CardNumber { get; set; }

    public string? AccountNumber { get; set; }

    public decimal? OutStanding { get; set; }

    public DateTime? LastPaidDate { get; set; }

    public decimal? LastPaidAmount { get; set; }

    public string? AllocatedTo { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public string UpdatedBy { get; set; } = null!;

    public DateTime UpdateDate { get; set; }

    public bool? IsActive { get; set; }
}
