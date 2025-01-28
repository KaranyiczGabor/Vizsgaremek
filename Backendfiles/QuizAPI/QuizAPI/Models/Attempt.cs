using System;
using System.Collections.Generic;

namespace QuizAPI.Models;

public partial class Attempt
{
    public Guid Id { get; set; }

    public Guid Uid { get; set; }

    public int Score { get; set; }

    public DateTime Time { get; set; }

    public virtual User UidNavigation { get; set; } = null!;
}
