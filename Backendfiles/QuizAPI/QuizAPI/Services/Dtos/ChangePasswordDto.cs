namespace QuizAPI.Services.Dtos
{
    public class ChangePasswordDto
    {
        public string Uid { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
