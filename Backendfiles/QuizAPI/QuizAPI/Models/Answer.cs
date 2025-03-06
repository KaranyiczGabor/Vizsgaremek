using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public partial class Answer
{
    [Column("id")]
    public Guid Id { get; set; }
    [Column("question_id")]
    public Guid QuestionId { get; set; }
    [Column("answer_text")]
    public string AnswerText { get; set; } = null!;
    [Column("correct")]
    public bool Correct { get; set; }

    public virtual Question Question { get; set; } = null!;
}
