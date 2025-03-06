﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public partial class Question
{
    [Column("id")]
    public Guid Id { get; set; }
    [Column("question")]
    public string Question1 { get; set; } = null!;
    [Column("category")]
    public string Category { get; set; } = null!;
    [Column("difficulty")]
    public int Difficulty { get; set; }

    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
}
