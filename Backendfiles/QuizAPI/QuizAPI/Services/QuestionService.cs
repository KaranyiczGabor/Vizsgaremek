using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.IService;

namespace QuizAPI.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly QuizdbContext _context;

        public QuestionService(QuizdbContext context)
        {
            _context = context;
        }

        public async Task<List<Question>> GetQuestions(string Category, int Difficulty)
        {
            return await _context.Questions.Where(q => q.Category == Category && q.Difficulty == Difficulty).ToListAsync();
        }
    }
}
