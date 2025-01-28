using System;
using System.Collections.Generic;

namespace QuizAPI.Models;

public partial class Question
{
    public Guid Id { get; set; }

    public string Question1 { get; set; } = null!;

    public string Category { get; set; } = null!;

    public int Difficulty { get; set; }

    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
}
