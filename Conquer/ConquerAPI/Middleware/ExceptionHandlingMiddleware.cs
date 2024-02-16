using ConquerAPI.DTOs;
using System.Net;
using System.Text.Json;

namespace ConquerAPI.Middleware
{
    public class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                ResponseDto response = new ResponseDto()
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
                string responseJson = JsonSerializer.Serialize(response);
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(responseJson);
            }
        }
    }
}
