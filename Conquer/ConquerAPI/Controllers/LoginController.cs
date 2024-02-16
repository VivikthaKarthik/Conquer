using ConquerAPI.DTOs;
using ConquerAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConquerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class LoginController : ControllerBase
    {
        private ILoginRepository _loginRepo;

        public LoginController(ILoginRepository loginRepo)
        {
            this._loginRepo = loginRepo;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginDto user)
        {
            IActionResult response = Unauthorized("Invalid Credentials");

            if (user != null && !string.IsNullOrEmpty(user.UserName) && !string.IsNullOrEmpty(user.Password))
            {
                var token = await _loginRepo.AuthenticateUser(user);

                if (!string.IsNullOrEmpty(token))
                {
                    response = Ok(new { token = token });
                }
            }
            return response;
        }        

    }
}
