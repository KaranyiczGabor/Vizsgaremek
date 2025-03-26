using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;
using System.Data.SqlTypes;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static QuizAPI.Services.Dtos.QuestionsDto;
using static QuizAPI.Services.Dtos.UserDto;

namespace QuizAPI.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _auth;
        private readonly IQuestionService _questionService;
        private readonly ILeaderboardService _leaderboardService;

        public UserController(IAuthService auth, IQuestionService questionService,ILeaderboardService leaderboardService, UserManager<ApplicationUser> userManager)
        {
            _auth = auth;
            _questionService = questionService;
            _leaderboardService = leaderboardService;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> AddNewUser(RegisterRequestDto registerRequestDto)
        {
            var user = await _auth.Register(registerRequestDto);

            if (user != null)
            {
                return StatusCode(201, user);
            }

            return BadRequest(new { result = "", message = "Sikertelen regisztráció." });
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            var user = await _auth.Login(loginRequestDto);
            if (user != null)
            {
                return Ok(new { token = user });
            }
            return Unauthorized(new { result = "", message = "Hibas felhasznalonev/jelszo" });
        }
        
        [HttpGet("getquestions")]
        public async Task<ActionResult> GetQuestions(string Category, int Difficulty)
        {
            var questions = await _questionService.GetQuestions(Category, Difficulty);

            if (questions == null)
            {
                return NotFound(new { message = "Nincs ilyen kerdes." });
            }

            return Ok(questions);
        }

        [HttpPost("checkanswer")]
        public async Task<IActionResult> CheckAnswers([FromBody] List<UserAnswerDto> userAnswers)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer", "").Trim();

            var handler = new JwtSecurityTokenHandler();

            var jwtToken = handler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == "sub")?.Value;

            var score = await _questionService.CheckAnswers(userId, userAnswers);

            return Ok(new { score });
        }
        [HttpGet("Leaderboard")]
        public async Task<IActionResult> Leaderboard()
        {
            var leaderboard = await _leaderboardService.Leaderboard();

            if (leaderboard != null)
            {
                return Ok(leaderboard);
            }

            return BadRequest();
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            if (string.IsNullOrWhiteSpace(model.Uid) ||
                string.IsNullOrWhiteSpace(model.CurrentPassword) ||
                string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest(new {message = "Az egyik sor ures"});
            }

            var user = await _userManager.FindByIdAsync(model.Uid);

            if (user == null)
            {
                return BadRequest(new {message = "A felhasznalo nem letezik"});
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (result.Succeeded)
            {
                return Ok(new { message = "Sikeresen megvaltoztattad a jelszavadat" });
            }

            return BadRequest(new { message = "Nem sikerult megvaltoztatni a jelszavadat" });
        }
    }
}
