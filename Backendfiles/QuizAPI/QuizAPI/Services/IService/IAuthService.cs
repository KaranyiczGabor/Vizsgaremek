using static QuizAPI.Services.Dtos.UserDto;

namespace QuizAPI.Services.IService
{
    public interface IAuthService
    {
        Task<object> Register(RegisterRequestDto registerRequestDto);
    }
}
