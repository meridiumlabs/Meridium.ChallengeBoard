using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using ChallengeBoard.Web.Extensions;
using ChallengeBoard.Web.Models;
using ChallengeBoard.Web.ViewModels;
using ChallengeBoard.Web.Shared.Attributes;

namespace ChallengeBoard.Web.Controllers {
    public class BoardController : RavenSessionController {

        [ImportModelStateFromTempData]
        public ActionResult Index(string username) {
            if (string.IsNullOrEmpty(username)) return RedirectToAction("Index", "Welcome");

            //TODO: Fix wait for non stale.
            var user = RavenSession.Query<User>().Customize(x => x.WaitForNonStaleResults()).FirstOrDefault(m => m.UserName == username.ToLower());
                      
            if (user == null) return View("NewUser", new User { UserName = username });
            
            if (user.IsPublic == false && user.IsAuthenticated() == false) {
                return RedirectToAction("Index", "Authentication", new { name = user.UserName });                
            }

            var model = BoardViewModelBuilder.Build(RavenSession, user);
            return View("Index", model);
        }

        [HttpPost]
        public ActionResult ToggleChallenge(string id, string currentUser, bool single) {
            var user = RavenSession.Load<User>("users/" + currentUser);
            if (user.IsAuthenticated() == false) return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
            if (single) {
                user.CompletedChallenges.Toggle(id);
            }
            else {
                user.CompletedChallenges.Add(id);
            }
            UpdateFeed(user, id);            
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        private void UpdateFeed(User user, string id) {
            var feedEntry = new Feed {
                UserId = user.Id,
                TimeStamp = DateTime.Now,
                ChallengeId = id
            };
            RavenSession.Store(feedEntry);
        }

        [HttpPost]
        public ActionResult ToggleChallengeSubtract(string id, string currentUser) {
            var user = RavenSession.Load<User>("users/" + currentUser);
            if (!user.IsAuthenticated()) return new HttpStatusCodeResult(HttpStatusCode.Forbidden);

            user.CompletedChallenges.Remove(id);               
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        
        [HttpPost]
        [ExportModelStateToTempData]
        public ActionResult NewUser(User user) {
            if (ModelState.IsValid) {               
                user.AuthID = Guid.NewGuid().ToString();
                RavenSession.Store(user);
                user.SetAuthenticationCookie();
            }
            return RedirectToAction("Index", new { username = user.UserName });
        }
    }
}