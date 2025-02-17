using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;
using static QuizAPI.Services.Dtos.QuestionsDto;

namespace QuizAPI.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly AppDbContext _context;

        public QuestionService(AppDbContext context)
        {
            _context = context;
        }

        // Get questions based on category and difficulty
        public async Task<List<QuestionDto>> GetQuestions(string Category, int Difficulty)
        {
            var questions = await _context.Questions
                .Where(q => q.Category.ToLower() == Category.ToLower() && q.Difficulty == Difficulty)
                .Include(q => q.Answers)
                .OrderBy(q => Guid.NewGuid())
                .Take(10)
                .ToListAsync();

            var result = questions.Select(q =>
                new QuestionDto(
                    q.Id,
                    q.Question1,
                    q.Category,
                    q.Difficulty,
                    q.Answers.Select(a => new AnswerDto(a.Id, a.AnswerText, a.QuestionId, a.Correct)).ToList()
                )
            ).ToList();

            return result;
        }

        public async Task<List<AnswerDto>> GetAnswers(Guid questionId)
        {
            var answers = await _context.Answers
                .Where(a => a.QuestionId == questionId)
                .Select(a => new AnswerDto(a.Id, a.AnswerText, a.QuestionId ,a.Correct))
                .ToListAsync();

            return answers;
        }
    }
}
