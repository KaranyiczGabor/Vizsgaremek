using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly QuizdbContext _quizdbContext;

        public UserController(QuizdbContext quizdbContext)
        {
            _quizdbContext = quizdbContext;
        }

    }
}
