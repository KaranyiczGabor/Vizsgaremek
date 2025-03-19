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
                 .Join(_context.Users,
                  attempt => attempt.Uid.ToString(),  // Convert Uid (Guid) to string
                  user => user.Id,                    // Match with IdentityUser.Id (string)
                  (attempt, user) => new LeaderboardDto
                  {
                      UserName = user.UserName,
                      Score = attempt.Score
                  })
            .OrderByDescending(l => l.Score)  // Sort by score
            .ToListAsync();
            return leaderboard;
        }
    }
}
