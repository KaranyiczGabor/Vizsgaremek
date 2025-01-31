using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAPI.Models;
using QuizAPI.Services.IService;
using static QuizAPI.Services.Dtos.UserDto;

namespace QuizAPI.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IAuthService auth;

        public UserController(IAuthService auth)
        {
            this.auth = auth;
        }

        [HttpPost("register")]
        public async Task<ActionResult> AddNewUser(RegisterRequestDto registerRequestDto)
        {
            var user = await auth.Register(registerRequestDto);

            if (user != null)
            {
                return StatusCode(201, user);
            }

            return BadRequest(new { result = "", message = "Sikertelen regisztráció." });
        }
    }
}
