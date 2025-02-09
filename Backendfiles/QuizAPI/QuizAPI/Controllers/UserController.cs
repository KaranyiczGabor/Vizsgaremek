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

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            var user = await auth.Login(loginRequestDto);
            if (user != null)
            {
                return Ok(new {token = user});
            }
            return Unauthorized(new { result = "", message = "Hibas felhasznalonev/jelszo" });
        }
        [HttpPost("assignrole")]
        public async Task<ActionResult> AssignRole(string UserName, string roleName)
        {
            var res = await auth.AssignRole(UserName, roleName);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest();
        }

    }
}
