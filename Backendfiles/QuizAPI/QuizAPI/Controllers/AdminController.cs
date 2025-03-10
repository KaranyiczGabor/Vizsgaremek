using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;

namespace QuizAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _auth;
        private readonly IQuestionService _questions;

        public AdminController(UserManager<ApplicationUser> userManager, IAuthService auth, IQuestionService questions)
        {
            _userManager = userManager;
            _auth = auth;
            _questions = questions;
        }

        [HttpPost("assignrole")]
        public async Task<ActionResult> AssignRole(string UserName, string roleName)
        {
            var res = await _auth.AssignRole(UserName, roleName);
            if (res != null)
            {
                return Ok(new { result = res, message = "Sikeres role hozzarendeles." });
            }
            return BadRequest(new { result = res, message = "Sikertelen role hozzarendeles." });
        }

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

        [HttpGet("GetUsersbyId")]
        public async Task<ActionResult<ApplicationUser>> GetUsersbyId(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik");
            }
            return Ok(user);
        }
        [HttpPut("UpdateUser")]
        public async Task<ActionResult> UpdateUser(string id, [FromBody] AdminDto model)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik.");
            }

            user.UserName = model.UserName;
            user.Email = model.Email;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "A felhasznalo sikeresen frissitve." });
        }

        [HttpDelete("DeleteUser")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "A felhasznalo torolve lett!" });
        }


        [HttpGet("getAllQuestions")]
        public async Task<ActionResult> GetAllQuestions()
        {
            var questions = await _questions.GetQuestionsAdmin();

            if (questions != null)
            {
                return Ok(questions);
            }

            return BadRequest();
        }

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

        [HttpDelete("DeleteQuestionWithAnswer")]
        public async Task<ActionResult> DeleteQuestionWithAnswer(Guid id)
        {
            var questions = await _questions.DeleteQuestion(id);

            if (questions != null)
            {
                return Ok(new {result = questions, message="Sikeres torles."});
            }

            return BadRequest(new { result = questions, message = "Sikertelen torles." });
        }
        [HttpGet("GetAnswers")]
        public async Task<ActionResult> GetAnswersAdmin()
        {
            var ans = await _questions.GetAnswersAdmin();

            if (ans != null)
            {
                return Ok(ans);
            }

            return BadRequest();
        }

        [HttpPut("EditAnswer")]
        public async Task<ActionResult> EditAnswer(Guid id, QuestionsDto.AnswerDto model)
        {
            var question = await _questions.EditAnswer(id, model);

            if (question != null)
            {
                return Ok(new { result = question, message = "Sikeresen megvaltoztattad a kerdest." });
            }

            return BadRequest(new { result = "", message = "Nem sikerult megvaltoztatni a kerdest." });
        }
    }
}

