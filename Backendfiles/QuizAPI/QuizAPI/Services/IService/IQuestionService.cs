using QuizAPI.Models;
using QuizAPI.Services.Dtos;

namespace QuizAPI.Services.IService
{
    public interface IQuestionService
    {
        Task<List<QuestionsDto.QuestionDto>> GetQuestions(string Category, int Difficulty);
        Task<int> CheckAnswers(string userId, List<QuestionsDto.UserAnswerDto> userAnswers);
        Task<List<Question>> GetQuestionsAdmin();
        Task<Question> DeleteQuestion(Guid id);
        Task<Question> EditQuestion(Guid id, QuestionsDto.QuestionDto question);

    }
}
