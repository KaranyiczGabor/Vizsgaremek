using System;
using System.Collections.Generic;

namespace QuizAPI.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;
}
