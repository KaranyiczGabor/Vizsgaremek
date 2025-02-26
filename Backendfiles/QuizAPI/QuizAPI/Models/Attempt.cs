using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public partial class Attempt
{
    public Guid Id { get; set; }

    public Guid Uid { get; set; }

    public int Score { get; set; }

    public DateTime Time { get; set; } = DateTime.UtcNow;

    [ForeignKey("Uid")]
    public User User { get; set; }
    public virtual User UidNavigation { get; set; } = null!;
}
