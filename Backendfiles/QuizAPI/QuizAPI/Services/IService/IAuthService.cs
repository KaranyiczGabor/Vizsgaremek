using static QuizAPI.Services.Dtos.UserDto;

namespace QuizAPI.Services.IService
{
    public interface IAuthService
    {
        Task<object> Register(RegisterRequestDto registerRequestDto);
        Task<object> Login(LoginRequestDto loginRequestDto);
        Task<object> AssignRole(string UserName, string roleName);
    }
}
