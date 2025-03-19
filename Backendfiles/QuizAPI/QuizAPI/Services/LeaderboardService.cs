using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;

namespace QuizAPI.Services
{
    public class LeaderboardService : ILeaderboardService
    {
        private readonly QuizdbContext _context;

        public LeaderboardService(QuizdbContext context)
        {
            _context = context;
        }

        public async Task<List<LeaderboardDto>> Leaderboard()
        {
            var leaderboard = await _context.Attempts
                .GroupBy(attempt => attempt.Uid) 
                .Select(group => new LeaderboardDto
                {
                    UserName = _context.Users
                        .Where(user => user.Id == group.Key.ToString())
                        .Select(user => user.UserName)
                        .FirstOrDefault(),
                    Score = group.Sum(attempt => attempt.Score) 
                })
                .OrderByDescending(l => l.Score) 
                .Take(10) 
                .ToListAsync();

            return leaderboard;
        }
    }
}
