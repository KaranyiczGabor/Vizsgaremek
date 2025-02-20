﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;
using static QuizAPI.Services.Dtos.QuestionsDto;
using static QuizAPI.Services.Dtos.UserDto;

namespace QuizAPI.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IAuthService auth;
        private readonly IQuestionService _questionService;

        public UserController(IAuthService auth, IQuestionService questionService)
        {
            this.auth = auth;
            this._questionService = questionService;
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
        public async Task<ActionResult> AssignRole(string UserName,string roleName)
        {
            var res = await auth.AssignRole(UserName, roleName);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest();
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
        [HttpGet("checkanswer")]
        public async Task<ActionResult> CheckAnswer(Guid QuestionId)
        {
            var answer = await _questionService.GetAnswers(QuestionId);

            if (answer == null)
            {
                return NotFound(new { message = "Answer not found." });
            }

            return Ok(answer);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(RefreshTokenDto refreshTokenDto)
        {
            var result = await auth.RefreshToken(refreshTokenDto.RefreshToken);

            if (result == null || result.message == "Invalid or expired refresh token.")
            {
                return Unauthorized(new { message = "Invalid refresh token." });
            }

            return Ok(new { result });
        }

    }
}
