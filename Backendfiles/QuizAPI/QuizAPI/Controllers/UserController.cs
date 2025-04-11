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
    // Az útvonalat beállítjuk, és nem szükséges az Authorization mivel a felhasználóknak nincs szükségük speciális szerepkörre
    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        // Szolgáltatások injektálása a konstruktorba
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _auth;
        private readonly IQuestionService _questionService;
        private readonly ILeaderboardService _leaderboardService;
        private readonly QuizdbContext _context;

        public UserController(IAuthService auth, IQuestionService questionService,ILeaderboardService leaderboardService, UserManager<ApplicationUser> userManager, QuizdbContext context)
        {
            _auth = auth;
            _questionService = questionService;
            _leaderboardService = leaderboardService;
            _userManager = userManager;
            _context = context;
        }

        // Felhasználó regisztrációja
        [HttpPost("register")]
        public async Task<ActionResult> AddNewUser(RegisterRequestDto registerRequestDto)
        {
            // Az AuthService regisztrálja a felhasználót
            var user = await _auth.Register(registerRequestDto);

            // Ellenőrizzük, hogy a regisztráció sikeres volt-e
            var x = user.GetType().GetProperty("result").GetValue(user, null);

            if (x != "")
            {
                return StatusCode(201, user); // Ha sikeres, 201-es státusszal válaszolunk
            }

            return BadRequest(new { result = "", message = "Sikertelen regisztráció." });  // Ha nem sikerült, 400-as státusszal válaszolunk
        }

        // Felhasználó bejelentkezése
        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            // Az AuthService bejelentkezteti a felhasználót
            var user = await _auth.Login(loginRequestDto);

            // Ellenőrizzük, hogy a bejelentkezés sikeres volt-e
            var x = user.GetType().GetProperty("result").GetValue(user,null);

            if (x != "")
            { 
                return Ok(new { token = user }); // Ha sikeres, visszaküldjük a token-t
            }

            return NotFound(new { result = "", message = "Hibas felhasznalonev/jelszo" }); // Ha nem sikerült, 404-es státusszal válaszolunk
        }

        // Kérdések lekérése kategória és nehézség szerint
        [HttpGet("getquestions")]
        public async Task<ActionResult> GetQuestions(string Category, int Difficulty)
        {
            // Kérdések lekérése a QuestionService segítségével
            var questions = await _questionService.GetQuestions(Category, Difficulty);

            if (questions == null)
            {
                return NotFound(new { message = "Nincs ilyen kerdes." }); // Ha nincsenek kérdések, 404-es válasz
            }

            return Ok(questions); // Ha találunk kérdéseket, 200-as válasz
        }

        // Válaszok ellenőrzése és a felhasználó pontszámának kiszámítása
        [HttpPost("checkanswer")]
        public async Task<IActionResult> CheckAnswers([FromBody] List<UserAnswerDto> userAnswers)
        {
            // Az Authorization header-ből kivesszük a Bearer token-t
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer", "").Trim();

            var handler = new JwtSecurityTokenHandler();

            var jwtToken = handler.ReadJwtToken(token); // JWT token dekódolása
            var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == "sub")?.Value;  // Felhasználó ID-jának kinyerése

            // Ellenőrizzük a válaszokat és kiszámoljuk a pontszámot
            var score = await _questionService.CheckAnswers(userId, userAnswers);

            return Ok(new { score }); // Visszaadjuk a felhasználó pontszámát
        }

        // Leaderboard lekérése
        [HttpGet("Leaderboard")]
        public async Task<IActionResult> Leaderboard()
        {
            // Lekérjük a ranglistát a LeaderboardService-től
            var leaderboard = await _leaderboardService.Leaderboard();

            if (leaderboard != null)
            {
                return Ok(leaderboard); // Visszaadjuk a ranglistát
            }

            return BadRequest(); // Ha nem találunk ranglistát, 400-as válasz
        }

        // Felhasználó profiljának lekérése ID alapján
        [HttpGet("GetUsersbyId")]
        public async Task<ActionResult<ApplicationUser>> GetUsersbyId(string Id)
        {
            // Felhasználó keresése az ID alapján
            var user = await _userManager.FindByIdAsync(Id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik"); // Ha nem találjuk, 404-es válasz
            }

            // Az adott felhasználó próbálkozásainak és pontszámainak összegyűjtése
            var quizAmount = await _context.Attempts
                .Where(a => a.Uid.ToString() == Id)
                .CountAsync();

            var totalPoints = await _context.Attempts
                .Where(a => a.Uid.ToString() == Id)
                .SumAsync(s => s.Score);

            // A profil adatainak visszaadása
            var returnData = new ProfileDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Id = user.Id,
                quizAmount = quizAmount,
                TotalPoints = totalPoints
            };

            return Ok(returnData); // Profil adatainak visszaadása
        }

        // Felhasználó jelszavának megváltoztatása
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            // Ellenőrizzük, hogy a bejövő adatok nem üresek
            if (string.IsNullOrWhiteSpace(model.Uid) ||
                string.IsNullOrWhiteSpace(model.CurrentPassword) ||
                string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest(new {message = "Az egyik sor ures"});
            }

            // Felhasználó keresése az ID alapján
            var user = await _userManager.FindByIdAsync(model.Uid);

            if (user == null)
            {
                return BadRequest(new {message = "A felhasznalo nem letezik"});
            }

            // Jelszó változtatása
            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (result.Succeeded)
            {
                return Ok(new { message = "Sikeresen megvaltoztattad a jelszavadat" });
            }

            return BadRequest(new { message = "Nem sikerult megvaltoztatni a jelszavadat" });
        }

        // Elfelejtett jelszó visszaállítása
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {
            // Ellenőrizzük, hogy a bejövő adatok nem üresek
            if (string.IsNullOrWhiteSpace(model.UserName) ||
                string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest(new { message = "Az egyik sor ures" });
            }

            // Felhasználó keresése a felhasználónév alapján
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return BadRequest(new { message = "A felhasznalo nem letezik" });
            }

            // Token generálása a jelszó visszaállításhoz
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Jelszó visszaállítása
            var result = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);

            if (result.Succeeded)
            {
                return Ok(new { message = "Sikeresen megvaltoztattad a jelszavadat" });
            }

            return BadRequest(new { message = "Nem sikerult megvaltoztatni a jelszavadat" });
        }
    }
}
