using Conquer.Models.Domain;
using ConquerAPI.DTOs;
using ConquerAPI.Services.Interfaces;
using System.Security.Claims;

namespace ConquerAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            _contextAccessor = httpContextAccessor;
        }
        public CurrentUser GetCurrentUser()
        {
            CurrentUser currentUser = new CurrentUser();

            if (_contextAccessor.HttpContext != null)
            {
                currentUser.UserId = _contextAccessor.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Sid)?.Value;
                currentUser.Name = _contextAccessor.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            }
            return currentUser;
        }
    }
}
