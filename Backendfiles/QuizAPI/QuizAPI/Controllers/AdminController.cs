using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using QuizAPI.Services.Dtos;
using QuizAPI.Services.IService;

namespace QuizAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<Aspnetuser> _userManager;

        public AdminController(UserManager<Aspnetuser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("GetUsers")]
        public async Task<ActionResult<IEnumerable<Aspnetuser>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users != null)
            {
                return Ok(users);
            }

            return BadRequest();
        }

        [HttpGet("GetUsersbyId")]
        public async Task<ActionResult<Aspnetuser>> GetUsersbyId(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik");
            }
            return Ok(user);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(string id, [FromBody] AdminDto model)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik.");
            }

            user.UserName = model.UserName;
            user.Email = model.Email;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "A felhasznalo sikeresen frissitve." });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("A keresett felhasznalo nem letezik.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "A felhasznalo torolve lett!" });
        }
    }
}
