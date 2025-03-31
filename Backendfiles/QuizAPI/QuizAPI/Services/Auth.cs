using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.IService;
using static QuizAPI.Services.Dtos.UserDto;

public class Auth : IAuthService
{
    private readonly QuizdbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ITokenGenerator _tokenGenerator;

    public Auth(QuizdbContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator tokenGenerator)
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
        };

        var result = await _userManager.CreateAsync(user, registerRequestDto.Password);

        if (result.Succeeded)
        {
            var userReturn = await _dbContext.applicationUser.FirstOrDefaultAsync(user => user.UserName == registerRequestDto.UserName);
            var roleName = "User";

            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            await _userManager.AddToRoleAsync(user, roleName);
            return new { result = userReturn };
        }

        return new { result = "", message = string.Join(", ", result.Errors.Select(e => e.Description)) };
    }

    public async Task<object> Login(LoginRequestDto loginRequestDto)
    {
        var user = await _userManager.FindByNameAsync(loginRequestDto.UserName.ToUpper());

        if (user == null)
        {
            return new { result = "", message = "Hibas felhasznalonev/jelszo.", token = "" };
        }

        bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

        if (isValid)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var jwtToken = _tokenGenerator.GenerateToken(user, roles);

            return new { result = new { user.UserName, user.Email, user.Id }, message = "Sikeres beléptetés.", token = jwtToken };
        }
        
        return new { result = "", message = "Nem regisztrált.", token = "" };
    }

    public async Task<object> AssignRole(string UserName, string roleName)
    {
        var user = await _userManager.FindByNameAsync(UserName);

        if (user != null)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            await _userManager.AddToRoleAsync(user, roleName);

            return new { result = user, message = "Sikeres hozzarendeles" };
        }

        return new { result = "", message = "Sikertelen hozzarendeles" };
    }
}
