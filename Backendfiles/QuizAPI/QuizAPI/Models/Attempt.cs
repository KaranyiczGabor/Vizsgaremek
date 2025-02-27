using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public partial class Attempt
{
    [Key]
    public Guid Id { get; set; }
    [Column("uid")]
    public string Uid { get; set; }

    public int Score { get; set; }

    public DateTime Time { get; set; } = DateTime.UtcNow;
    [ForeignKey("Uid")]
    public virtual ApplicationUser UidNavigation { get; set; } = null!;

}
