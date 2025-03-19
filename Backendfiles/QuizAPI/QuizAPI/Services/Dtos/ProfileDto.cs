namespace QuizAPI.Services.Dtos
{
    public class ProfileDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Id { get; set; }
        public int quizAmount { get; set; }
        public int TotalPoints { get; set; }
    }
}
