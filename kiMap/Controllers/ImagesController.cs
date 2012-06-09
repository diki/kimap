using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using kiMap.Models;
using System.IO;
using System.Web.Script.Serialization;

namespace kiMap.Controllers
{
    public class ImagesController : Controller
    {
        public static object SuccessResponse()
        {
            return new { success = true };
        }
        //
        // GET: /Images/
        //[HttpPost]
        //public JsonResult Upload(ImageModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        string fileName = Guid.NewGuid().ToString();
        //        string serverPath = Server.MapPath("~");
        //        string imagesPath = serverPath + "Content\\Images\\";
        //        string thumbPath = imagesPath + "Thumb\\";
        //        string fullPath = imagesPath + "Full\\";
        //        ImageModel.ResizeAndSave(thumbPath, fileName, model.ImageUploaded.InputStream, 80, true);
        //        ImageModel.ResizeAndSave(fullPath, fileName, model.ImageUploaded.InputStream, 600, true);
        //    }

        //    return Json(new { success = true });
        //}

        [HttpPost]
        public ActionResult Upload(ImageModel model)
        {
            //string[] s = qqfile.Split('.');
            //string extension = s[s.Length - 1];
            string fileName = Guid.NewGuid().ToString();
            string serverPath = Server.MapPath("~");
            string imagesPath = serverPath + "Content\\Images\\";
            string thumbPath = imagesPath + "Thumb\\";
            string fullPath = imagesPath + "Full\\";

            //string fname = Path.Combine(serverPath, fileName);

            //using (var output = System.IO.File.Create(fname))
            //{
            //    Request.InputStream.CopyTo(output);
            //}

            var stream = Request.InputStream;
            //if (String.IsNullOrEmpty(Request["qqfile"]))
            //{
            //    // IE
            //    HttpPostedFileBase postedFile = Request.Files[0];
            //    stream = postedFile.InputStream;
            //    //file = Path.Combine(path, System.IO.Path.GetFileName(Request.Files[0].FileName));
            //}

            try
            {
                ImageModel.ResizeAndSave(thumbPath, fileName, model.ImageUploaded.InputStream, 120, true, false);
                ImageModel.ResizeAndSave(fullPath, fileName, model.ImageUploaded.InputStream, 600, false, true);

                var result = new { success = true, src = fileName+".jpg"};
                var json = new JavaScriptSerializer().Serialize(result);

                return Content(json, "text/plain");
            }
            catch (System.Exception ex)
            {
                return Json(new { success = false });
            }

        }

    }
}
