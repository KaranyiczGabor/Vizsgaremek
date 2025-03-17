using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;
using System.Runtime.CompilerServices;
using static QuizAPI.Services.Dtos.QuestionsDto;

namespace QuizAPI.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly QuizdbContext _context;

        public QuestionService(QuizdbContext context)
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
                    q.Answers.Select(a => new AnswerDto(a.Id, a.AnswerText, a.QuestionId, a.Correct)).OrderBy(a => Guid.NewGuid()).ToList()
                )
            ).ToList();

            return result;
        }

        public async Task<int> CheckAnswers(string Uid, List<UserAnswerDto> userAnswers)
        {
            int score = 0;

            foreach (var userAnswer in userAnswers)
            {
                var correctAnswer = await _context.Answers
                    .Where(a => a.QuestionId == userAnswer.QuestionId && a.Correct)
                    .FirstOrDefaultAsync();

                var questionDifficulty = await _context.Questions.Where(q => q.Id == userAnswer.QuestionId).FirstOrDefaultAsync();

                if (correctAnswer != null && correctAnswer.AnswerText == userAnswer.AnswerText)
                {
                    if (questionDifficulty.Difficulty == 1)
                    {
                        score++;
                    }
                    else if (questionDifficulty.Difficulty == 2)
                    {
                        score += 2;
                    }
                    else if (questionDifficulty.Difficulty == 3)
                    {
                        score += 3;
                    }
                }
            }

            var attempt = new Attempt
            {
                Id = Guid.NewGuid(),
                Uid = Guid.Parse(Uid),
                Score = score,
                Time = DateTime.Now
            };

            _context.Attempts.Add(attempt);
            await _context.SaveChangesAsync();

            return score;
        }


        public async Task<List<QuestionDto>> GetQuestionsAdmin(string Category, int Difficulty)
        {
            var questions = await _context.Questions
            .Where(q => q.Category.ToLower() == Category.ToLower() && q.Difficulty == Difficulty)
            .Include(q => q.Answers)
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

        public async Task<Question> EditQuestion(Guid id, [FromBody] QuestionDto model)
        {
            var question = await _context.Questions.SingleOrDefaultAsync(x => x.Id == id);
            if (question == null)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(model.Question1))
            {
                question.Question1 = model.Question1;
            }

            _context.Questions.Update(question);
            _context.SaveChanges();

            return question;
        }


        public async Task<Question> DeleteQuestion(Guid id)
        {
            var question = await _context.Questions
                .Include(a => a.Answers)
                .SingleOrDefaultAsync(x =>x.Id == id);

            if (question != null)
            {
                _context.Answers.RemoveRange(question.Answers);
                
                _context.Questions.Remove(question);
                
                await _context.SaveChangesAsync();
                
                return question;
            }
            return null;
        }
        public async Task<List<Answer>> GetAnswersAdmin()
        {
            var answers = await _context.Answers.ToListAsync();

            return answers;
        }

        public async Task<Answer> EditAnswer(Guid id, [FromBody] AnswerDto model)
        {
            var answer = await _context.Answers.SingleOrDefaultAsync(x => x.Id == id);

            if (answer == null)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(model.AnswerText))
            {
                answer.AnswerText = model.AnswerText;
            }
            return answer;
        }
    }
}