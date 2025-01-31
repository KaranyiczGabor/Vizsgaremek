﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;
using static QuizAPI.Services.Dtos.UserDto;

namespace QuizAPI.Services
{
    public class Auth : IAuthService
    {
        private readonly AppDbcontext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenGenerator _tokenGenerator;

        public Auth(AppDbcontext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator tokenGenerator)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<object> Register(RegisterRequestDto registerRequestDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email,
                BirthDate = registerRequestDto.BirthDate,
            };

            var result = await _userManager.CreateAsync(user, registerRequestDto.Password);

            if (result.Succeeded)
            {
                var userReturn = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.UserName == registerRequestDto.UserName);

                return new { result = userReturn };
            }
            return new { result = "", message = result.Errors.FirstOrDefault().Description };

        }

        public async Task<object> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _dbContext.applicationUsers.FirstOrDefaultAsync(user => user.NormalizedUserName == loginRequestDto.UserName.ToUpper());

            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (isValid)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var jwtToken = _tokenGenerator.GenerateToken(user, roles);

                return new { result = new { user.UserName, user.Email }, message = "Sikeres beléptetés.", token = jwtToken };
            }

            return new { result = "", message = "Nem regisztrált.", token = "" };
        }
    }
}
