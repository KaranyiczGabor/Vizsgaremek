using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAPI.Services.IService;

namespace QuizAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAuthService _auth;

        public AdminController(IAuthService auth)
        {
            _auth = auth;
        }
        [Authorize(Roles ="Admin")]
        [HttpGet("GetUserAdmin")]
        public async Task<ActionResult> GetUserAdmin()
        {

        }
    }
}
