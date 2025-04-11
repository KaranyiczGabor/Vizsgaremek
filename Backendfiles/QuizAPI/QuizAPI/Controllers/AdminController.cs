using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;
using static QuizAPI.Services.Dtos.QuestionsDto;

namespace QuizAPI.Controllers
{
    // AdminController útvonal beállítása, amely csak az "Admin" szerepkörben lévő felhasználók számára elérhető
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        // Szükséges szolgáltatások injektálása a konstruktorba
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _auth;
        private readonly IQuestionService _questions;
        private readonly QuizdbContext _context;

        // Konstruktor, amely inicializálja a szükséges szolgáltatásokat
        public AdminController(UserManager<ApplicationUser> userManager, IAuthService auth, IQuestionService questions, QuizdbContext context)
        {
            _userManager = userManager;
            _auth = auth;
            _questions = questions;
            _context = context;
        }

        // Role hozzárendelése a felhasználóhoz (Admin jogosultsággal)
        [HttpPost("assignrole")]
        public async Task<ActionResult> AssignRole(string UserName, string roleName)
        {
            // Role hozzárendelése a felhasználóhoz az AuthService-en keresztül
            var res = await _auth.AssignRole(UserName, roleName);
            if (res != null)
            {
                return Ok(new { result = res, message = "Sikeres role hozzarendeles." });
            }
            return BadRequest(new { result = res, message = "Sikertelen role hozzarendeles." });
        }

        // Minden felhasználó lekérdezése
        [HttpGet("GetUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users != null)
            {
                return Ok(users);
            }

            return BadRequest();
        }

        // Felhasználó frissítése (pl. email és username módosítás)
        [HttpPut("UpdateUser")]
        public async Task<ActionResult> UpdateUser(string id, [FromBody] AdminDto model)
        {
            // Felhasználó keresése az ID alapján
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik.");
            }

            // Felhasználó adatainak módosítása
            user.UserName = model.UserName;
            user.Email = model.Email;

            // Módosítás alkalmazása
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "A felhasznalo sikeresen frissitve." });
        }

        // Felhasználó törlése
        [HttpDelete("DeleteUser")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            // Felhasználó keresése az ID alapján
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik.");
            }

            // Felhasználó törlése
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "A felhasznalo torolve lett!" });
        }

        // Minden kérdés és a hozzájuk tartozó válaszok lekérése
        [HttpGet("getAllQuestionsWAnswers")]
        public async Task<ActionResult> GetAllQuestionsWAnswers()
        {
            // Kérdések és válaszok lekérése az adatbázisból
            var questions = await _context.Questions
                .Include(q => q.Answers) // A válaszok betöltése
                .ToListAsync();

            // Kérdések DTO formátumban történő átalakítása
            var result = questions.Select(q =>
                new QuestionDto(
                    q.Id,
                    q.Question1,
                    q.Category,
                    q.Difficulty,
                    q.Answers.Select(a => new AnswerDto(a.Id, a.AnswerText, a.QuestionId, a.Correct)).OrderBy(a => Guid.NewGuid()).ToList() // Véletlenszerű válaszok
                )
            ).ToList();

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        // Kérdés lekérése az ID alapján és a hozzá tartozó válaszok
        [HttpGet("getAllQuestionsWAnswersById")]
        public async Task<ActionResult> GetAllQuestionsWAnswersById(Guid id)
        {
            var questions = await _context.Questions
                .Where(q=> q.Id == id) // Kérdés keresése ID alapján
                .Include(q => q.Answers) // A válaszok betöltése
                .ToListAsync();

            var result = questions.Select(q =>
                new QuestionDto(
                    q.Id,
                    q.Question1,
                    q.Category,
                    q.Difficulty,
                    q.Answers.Select(a => new AnswerDto(a.Id, a.AnswerText, a.QuestionId, a.Correct)).OrderBy(a => Guid.NewGuid()).ToList() // Véletlenszerű válaszok
                )
            ).ToList();

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        // Kérdés szerkesztése
        [HttpPut("EditQuestion")]
        public async Task<ActionResult> EditQuestion(Guid id, QuestionsDto.QuestionDto model)
        {
            var question = await _questions.EditQuestion(id, model);
            if (question != null)
            {
                return Ok(new { result = question, message = "Sikeresen megvaltoztattad a kerdest." });
            }
            return BadRequest(new { result = "", message="Nem sikerult megvaltoztatni a kerdest."});
        }

        // Kérdés és válasz törlése
        [HttpDelete("DeleteQuestionWithAnswer")]
        public async Task<ActionResult> DeleteQuestionWithAnswer(Guid id)
        {
            var question = await _questions.DeleteQuestion(id);

            if (question != null)
            {
                return Ok(new { result = question, message = "Sikeres torles." });
            }

            return BadRequest(new { result = question, message = "Sikertelen torles." });
        }

        // Válasz szerkesztése
        [HttpPut("EditAnswer")]
        public async Task<ActionResult> EditAnswer(Guid id, QuestionsDto.AnswerDto model)
        {
            var answer = await _questions.EditAnswer(id, model);

            if (answer != null)
            {
                return Ok(new { result = answer, message = "Sikeresen megvaltoztattad a kerdest." });
            }

            return BadRequest(new { result = "", message = "Nem sikerult megvaltoztatni a kerdest." });
        }
    }
}

