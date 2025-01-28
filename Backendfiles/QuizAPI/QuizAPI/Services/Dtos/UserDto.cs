namespace QuizAPI.Services.Dtos
{
    public class UserDto
    {
        public record RegisterRequestDto(string UserName, string Password, string Email, DateTime BirthDate);
        public record LoginRequestDto(string UserName, string Password);
    }
}
