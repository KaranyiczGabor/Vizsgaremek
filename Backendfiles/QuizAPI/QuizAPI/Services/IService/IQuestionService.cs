using QuizAPI.Models;
using QuizAPI.Services.Dtos;

namespace QuizAPI.Services.IService
{
    public interface IQuestionService
    {
        Task<List<QuestionsDto.QuestionDto>> GetQuestions(string Category, int Difficulty);

        Task<int> CheckAnswers(string userId, List<QuestionsDto.UserAnswerDto> userAnswers);

        Task<List<QuestionsDto.QuestionDto>> GetQuestionsAdmin(string Category, int Difficulty);

        Task<Question> DeleteQuestion(Guid id);

        Task<Question> EditQuestion(Guid id, QuestionsDto.QuestionDto question);

        Task<List<Answer>> GetAnswersAdmin();

        Task<Answer> EditAnswer(Guid id, QuestionsDto.AnswerDto answer);

    }
}
