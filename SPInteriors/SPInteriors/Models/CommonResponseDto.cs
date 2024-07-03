namespace SPInteriors.Models
{
    public class CommonResponseDto
    {
        public object Result { get; set; }
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
    }
}
