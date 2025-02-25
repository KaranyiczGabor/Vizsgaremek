namespace QuizAPI.Services.Dtos
{
    public class QuestionsDto
    {
        public record QuestionDto(Guid Id, string Question1, string Category, int Difficulty, List<AnswerDto> Answers);
        public record AnswerDto(Guid AnswerId, string AnswerText, Guid QuestionId, bool Correct);
        public record UserAnswerDto(Guid QuestionId, string AnswerText);

    }
}
