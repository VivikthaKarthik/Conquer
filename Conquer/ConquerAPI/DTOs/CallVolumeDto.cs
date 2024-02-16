namespace ConquerAPI.DTOs
{
    public class CallVolumeDto
    {
        public string? CallVolumeId { get; set; }

        public string? CustomerName { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }

        public string? Pan { get; set; }

        public string? CardNumber { get; set; }

        public string? AccountNumber { get; set; }

        public decimal? OutStanding { get; set; }

        public DateTime? LastPaidDate { get; set; }

        public decimal? LastPaidAmount { get; set; }

        public string? AllocatedTo { get; set; }
    }

    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public List<Answer> Answers { get; set; }

        public Question()
        {
            Answers = new List<Answer>();
        }
    }

    public class Answer
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
        public byte[] Image { get; set; } // Byte array to store image
    }
}
