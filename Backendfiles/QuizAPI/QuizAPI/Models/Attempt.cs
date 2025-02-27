using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public partial class Attempt
{
    public Guid Id { get; set; }

    public string Uid { get; set; }

    public int Score { get; set; }

    public DateTime Time { get; set; } = DateTime.UtcNow;

    public virtual ApplicationUser UidNavigation { get; set; } = null!;

}
