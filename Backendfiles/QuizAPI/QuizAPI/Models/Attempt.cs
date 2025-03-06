using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public partial class Attempt
{
    [Column("id")]
    public Guid Id { get; set; }
    [Column("uid")]
    public Guid Uid { get; set; }
    [Column("score")]
    public int Score { get; set; }
    [Column("time")]
    public DateTime Time { get; set; }
}
