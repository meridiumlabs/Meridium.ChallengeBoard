using ChallengeBoard.Web.Models;
using ChallengeBoard.Web.Shared.Attributes;
using ChallengeBoard.Web.ViewModels;
using System.Linq;
using System.Web.Mvc;

namespace ChallengeBoard.Web.Controllers {
    public class HomeController : RavenSessionController {
        [ImportModelStateFromTempData]
        public ActionResult Index() {
            return View(new HomeViewModel());
        }

        [HttpPost]
        [ExportModelStateToTempData]
        public ActionResult New(HomeViewModel model) {
            if(ModelState.IsValid == false) return RedirectToAction("Index");

            if (RavenSession.Query<User>().Any(x => x.UserName == model.UserName)) {
                ModelState.AddModelError("UserName", "Namnet är redan taget");
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index", "Board", new { username = model.UserName });
        }
    }
}