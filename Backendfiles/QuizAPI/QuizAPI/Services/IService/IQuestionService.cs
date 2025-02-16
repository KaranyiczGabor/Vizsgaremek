using QuizAPI.Models;

namespace QuizAPI.Services.IService
{
    public interface IQuestionService
    {
        Task<List<Question>> GetQuestions(string Category, int Difficulty);
    }
}
