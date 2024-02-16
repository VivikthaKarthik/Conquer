using System.IO;
using ConquerAPI.DTOs;
using DocumentFormat.OpenXml.Office2019.Drawing.Model3D;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace ConquerAPI.Repositories.Implementations
{
    public class DocumentReader
    {
        //public List<Question> ProcessDocument(Stream documentStream)
        //{
        //    List<Question> questions = new List<Question>();

        //    using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(documentStream, false))
        //    {
        //        MainDocumentPart mainPart = wordDoc.MainDocumentPart;

        //        var paragraphs = mainPart.Document.Body.Elements<DocumentFormat.OpenXml.Drawing.Paragraph>();

        //        Question currentQuestion = null;

        //        foreach (var paragraph in paragraphs)
        //        {
        //            var runs = paragraph.Elements<DocumentFormat.OpenXml.Drawing.Run>();

        //            foreach (var run in runs)
        //            {
        //                // Check if the run has text
        //                var text = run.GetFirstChild<DocumentFormat.OpenXml.Drawing.Text>();
        //                if (text != null)
        //                {
        //                    // Assume that the first run in a paragraph contains the question text
        //                    if (currentQuestion == null)
        //                    {
        //                        currentQuestion = new Question { QuestionText = text.Text };
        //                    }
        //                    else
        //                    {
        //                        // Subsequent runs contain answer text
        //                        currentQuestion.Answers.Add(new Answer { AnswerText = text.Text });
        //                    }
        //                }

        //                // Check if the run has an embedded image
        //                var drawing = run.GetFirstChild<Drawing>();
        //                if (drawing != null)
        //                {
        //                    var blip = drawing.Descendants<Blip>().FirstOrDefault();
        //                    if (blip != null)
        //                    {
        //                        var imagePart = (ImagePart)mainPart.GetPartById(blip.Embed);
        //                        var imageStream = imagePart.GetStream();

        //                        // Convert the image stream to a byte array and save it to the current answer
        //                        using (MemoryStream ms = new MemoryStream())
        //                        {
        //                            imageStream.CopyTo(ms);
        //                            currentQuestion.Answers.Last().Image = ms.ToArray();
        //                        }
        //                    }
        //                }
        //            }

        //            // Check for new question (assumes questions and answers alternate in the document)
        //            if (currentQuestion != null && currentQuestion.Answers.Any())
        //            {
        //                questions.Add(currentQuestion);
        //                currentQuestion = null;
        //            }
        //        }
        //    }

        //    return questions;
        //}

        //public async Task<List<Question>> ProcessDocument(Stream documentStream)
        //{
        //    List<Question> questions = new List<Question>();
        //    Question currentQuestion = null;

        //    using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(documentStream, false))
        //    {
        //        var paragraphs = wordDoc.MainDocumentPart.Document.Body.Elements<Paragraph>();

        //        foreach (var paragraph in paragraphs)
        //        {
        //            var runs = paragraph.Elements<Run>().ToList();

        //            if (runs.Any())
        //            {
        //                foreach (var run in runs)
        //                {
        //                    var text = run.GetFirstChild<Text>();

        //                    if (text != null)
        //                    {
        //                        string decodedText = System.Text.Encoding.UTF8.GetString(System.Text.Encoding.Default.GetBytes(text.Text));

        //                        if (currentQuestion == null)
        //                        {
        //                            currentQuestion = new Question { QuestionText = decodedText };
        //                        }
        //                        else
        //                        {
        //                            currentQuestion.Answers.Add(new Answer { AnswerText = decodedText });
        //                        }
        //                    }

        //                    var drawing = run.GetFirstChild<Drawing>();

        //                    if (drawing != null)
        //                    {

        //                        var blip = drawing.Descendants<Blip>().FirstOrDefault();

        //                        if (blip != null)
        //                        {
        //                            var imagePart = (ImagePart)wordDoc.MainDocumentPart.GetPartById(blip.Embed);
        //                            var imageStream = imagePart.GetStream();

        //                            using (MemoryStream ms = new MemoryStream())
        //                            {
        //                                imageStream.CopyTo(ms);
        //                                currentQuestion.Answers.Last().Image = ms.ToArray();
        //                            }
        //                        }
        //                    }
        //                }
        //            }

        //            if (currentQuestion != null && currentQuestion.Answers != null && currentQuestion.Answers.Count == 4)
        //            {
        //                questions.Add(currentQuestion);
        //                currentQuestion = null;
        //            }
        //        }
        //    }

        //    return questions;
        //}

        //public List<string> ReadFormulas(WordprocessingDocument wordDoc)
        //{
        //    List<string> formulas = new List<string>();

        //    foreach (var paragraph in wordDoc.MainDocumentPart.Document.Body.Elements<Paragraph>())
        //    {
        //        string decodedText = System.Text.Encoding.UTF8.GetString(System.Text.Encoding.UTF8.GetBytes(paragraph.InnerText)); 

        //        formulas.Add(decodedText);
        //    }

        //    return formulas;
        //}

        public async Task<List<Question>> ProcessDocument(Stream documentStream)
        {
            List<Question> questions = new List<Question>();
            Question currentQuestion = null;

            using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(documentStream, false))
            {
                var paragraphs = wordDoc.MainDocumentPart.Document.Body.Elements<Paragraph>();

                foreach (var paragraph in paragraphs)
                {
                    var runs = paragraph.Elements<Run>().ToList();

                    if (runs.Any())
                    {
                        foreach (var run in runs)
                        {
                            var text = run.GetFirstChild<Text>();

                            if (text != null)
                            {
                                // Explicitly set the encoding to UTF-8
                                //string decodedText = System.Text.Encoding.UTF8.GetString(System.Text.Encoding.Default.GetBytes(text.Text));
                                string decodedText = System.Text.Encoding.GetEncoding(1253).GetString(System.Text.Encoding.Default.GetBytes(text.Text));


                                if (currentQuestion == null)
                                {
                                    currentQuestion = new Question { QuestionText = decodedText };
                                }
                                else
                                {
                                    currentQuestion.Answers.Add(new Answer { AnswerText = decodedText });
                                }
                            }

                            var drawing = run.GetFirstChild<Drawing>();

                            if (drawing != null)
                            {
                                var blip = drawing.Descendants<Blip>().FirstOrDefault();

                                if (blip != null)
                                {
                                    var imagePart = (ImagePart)wordDoc.MainDocumentPart.GetPartById(blip.Embed);
                                    var imageStream = imagePart.GetStream();

                                    using (MemoryStream ms = new MemoryStream())
                                    {
                                        imageStream.CopyTo(ms);
                                        currentQuestion.Answers.Last().Image = ms.ToArray();
                                    }
                                }
                            }
                        }
                    }

                    if (currentQuestion != null && currentQuestion.Answers.Any())
                    {
                        questions.Add(currentQuestion);
                        currentQuestion = null;
                    }
                }
            }

            return questions;
        }
    }
}
