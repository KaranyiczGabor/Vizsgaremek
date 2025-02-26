using QuizAPI.Models;
using QuizAPI.Services.Dtos;

namespace QuizAPI.Services.IService
{
    public interface IQuestionService
    {
        Task<List<QuestionsDto.QuestionDto>> GetQuestions(string Category, int Difficulty);
        Task<int> CheckAnswers(Guid userId, List<QuestionsDto.UserAnswerDto> userAnswers);

    }
}
