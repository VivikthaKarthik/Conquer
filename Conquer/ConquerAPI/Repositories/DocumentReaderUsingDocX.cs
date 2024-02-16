using DocumentFormat.OpenXml.ExtendedProperties;
using System.Text;
using Xceed.Words.NET;
using Word = Microsoft.Office.Interop.Word;

namespace ConquerAPI.Repositories
{
    public class DocumentReaderUsingDocX
    {
        public DocumentReaderUsingDocX() { }

        public List<string> ExtractQuestionsAndAnswers(string filePath)
        {
            List<string> questionsAndAnswers = new List<string>();
            using (StreamReader reader = new StreamReader(filePath, System.Text.Encoding.GetEncoding("iso-8859-1")))
            {

                using (DocX document = DocX.Load(reader.BaseStream))
                {
                    // Assuming questions and answers are separated by a specific pattern.
                    string separator = "--EOQ--"; // Change this to your actual separator.

                    // Extract text from the document.
                    string documentText = document.Text;

                    // Split the text into questions and answers based on the separator.
                    string[] qnaArray = documentText.Split(new[] { separator }, StringSplitOptions.RemoveEmptyEntries);

                    // Add questions and answers to the list.
                    foreach (string qna in qnaArray)
                    {
                        questionsAndAnswers.Add(qna.Trim());
                    }
                }
            }
            return questionsAndAnswers;
        }
    }
}
