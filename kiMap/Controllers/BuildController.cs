using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace kiMap.Controllers
{
    public class BuildController : Controller
    {
        //
        // GET: /Build/

        
        public JsonResult Page(string s, string t)
        {
           // return "ooooo";

            //return default models for collection if source is new
            var DefaultHeaderModel = new
            {
                type = "header",
                header = "Mesajınızı buraya yazın",
                subheader = "Alt başlık ekleyin",
                order = 0
            };

            var DefaultTextModel = new
            {
                type= "text",
                title= "Bu işte en iyi biziz",
                content= "Ne iş yapıyorsunuz. Sizin için önemi nedir. Ürün, servis ...",
                order = 1
            };

            //title
            var DefaultTitleModel = new {
                type = "title",
                content = "Ürünlerimiz",
                order = 2
            };

            //gallery
            var DefaultGalleryModel = new {
                type =  "gallery",
                title1 =  "title 1",
                content1 =  "content 1",
                title2 =  "title 2",
                content2 =  "content 2",
                title3 =  "title 3",
                content3 =  "content 3",
                order = 3
                
            };

            //bio
            var DefaultBioModel = new {
                type =  "bio",
                title =  "Biz !!!",
                address =  "Adrs",
                phone =  "phone",
                email =  "email",
                website =  "website",
                order = 4
            };

            List<Object> models = new List<object>();
            models.Add(DefaultHeaderModel);
            models.Add(DefaultTextModel);
            models.Add(DefaultTitleModel);
            models.Add(DefaultGalleryModel);
            models.Add(DefaultBioModel);

            return Json(new { data=models, success = true, source = s, type=t }, JsonRequestBehavior.AllowGet);
        }

    }
}
