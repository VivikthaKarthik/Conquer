using InteriorDesignWebAPI.Models.Dtos;
using System.Text;

namespace InteriorDesignWebAPI.Utilities
{
    public class HtmlAppender
    {
        public string AppendHtmlTags(ResponseDto actualResponse)
        {
            StringBuilder text = new StringBuilder();

            if(actualResponse != null)
            {
                var data = (List<RoomDto>)actualResponse.Result;

                if(data != null && data.Any())
                {
                    foreach(var item in data)
                    {
                        text.Append("<div class=\"col-lg-3 col-md-5\" style=\"margin-top:20px;\">");
                        text.Append("<div class= \"team-member-card\">");
                        text.Append("<div class=\"content-wrapper\">");
                        text.Append("<div class=\"content\">");
                        text.Append("<h2 class=\"title\">" + item.Name + "</h2>");
                        text.Append("</div>");
                        text.Append("</div>");
                        text.Append("<div class=\"image\">");
                        text.Append("<img style=\"height:100%;max-height:250px;width:100%;\" src='" + item.ImagePath + "' />");
                        text.Append("</div>");
                        text.Append("</div >");
                        text.Append("</div > ");
                    }
                }
            }

            return text.ToString();
        }
    }
}
