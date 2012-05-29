using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Facebook.Web;

namespace kiMap.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";
            ViewBag.fb_loggedIn = false;

            if (FacebookWebContext.Current != null) {
                if (FacebookWebContext.Current.IsAuthenticated())
                {
                    var client = new FacebookWebClient();
                    dynamic me = client.Get("me");

                    ViewBag.fb_loggedIn = true;
                    ViewBag.FirstName = me.first_name;
                    ViewBag.LastName = me.last_name;
                    ViewBag.Id = me.id;
                    ViewBag.Picture = me.picture;
                    ViewBag.Email = me.email;
                    
                }
            }

            return View();
        }

        public String fb_canvas()
        {
            return "face";
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
