using System;
using System.Collections.Generic;

namespace QuizAPI.Models;

public partial class Answer
{
    public Guid Id { get; set; }

    public Guid QuestionId { get; set; }

    public string AnswerText { get; set; } = null!;

    public bool Correct { get; set; }

    public virtual Question Question { get; set; } = null!;
}
