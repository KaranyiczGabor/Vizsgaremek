using QuizAPI.Services.Dtos;

namespace QuizAPI.Services.IService
{
    public interface ILeaderboardService
    {
        Task<List<LeaderboardDto>> Leaderboard();
    }
}
