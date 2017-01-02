using HealthCatalyst.Constants.HomeController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HealthCatalyst.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [Route(HomeControllerUrl.SLOW, Name = HomeControllerRoute.SLOW)]
        public ActionResult Slow()
        {
            ViewBag.Message = "Slow things down";

            return View();
        }

        [Route("AboutMe")]  
        public ActionResult About()
        {
            ViewBag.Message = "All about me!";

            return View();
        }
    }
}