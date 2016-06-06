using System.Linq;
using System.Web.Mvc;
using ChallengeBoard.Web.Extensions;
using ChallengeBoard.Web.Models;

namespace ChallengeBoard.Web.Controllers {
    public class AuthenticationController : RavenSessionController {
        public ActionResult Index(string name) {            
            return View(new User { UserName = name });
        }
        
        [HttpPost]
        public ActionResult Login(User user) {            
            var userFromDatabase = RavenSession.Query<User>().Customize(x => x.WaitForNonStaleResults()).FirstOrDefault(m => m.UserName == user.UserName);
            if (userFromDatabase != null && user.Password != userFromDatabase.Password) {
                return RedirectToAction("Index", new { name = user.UserName });
            }
            userFromDatabase.SetAuthenticationCookie();                        
            return RedirectToAction("Index", "Home", new { name = user.UserName });
        }
    }
}
