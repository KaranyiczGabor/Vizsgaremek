using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;

namespace QuizAPI.Services
{
    public class Auth : IAuthService
    {
        private readonly AppDbcontext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public Auth(AppDbcontext dbcontext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbcontext;
            _userManager = userManager;
        }

        public async Task<object> Register(UserDto.RegisterRequestDto registerRequestDto)
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
    }
}
