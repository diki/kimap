using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace kiMap.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
        [CBAuthorize]
        public ActionResult Index()
        {
            return View();
        }

    }
}
