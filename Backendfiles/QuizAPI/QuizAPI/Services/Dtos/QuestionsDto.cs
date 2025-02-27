namespace QuizAPI.Services.Dtos
{
    public class QuestionsDto
    {
        public record QuestionDto(Guid Id, string Question1, string Category, int Difficulty, List<AnswerDto> Answers);
        public record AnswerDto(Guid AnswerId, string AnswerText, Guid QuestionId, bool Correct);
        public record UserAnswerDto
        {
            public Guid QuestionId { get; set; }
            public Guid Id { get; set; }
            public string AnswerText { get; set; }
                
        };

    }
}
