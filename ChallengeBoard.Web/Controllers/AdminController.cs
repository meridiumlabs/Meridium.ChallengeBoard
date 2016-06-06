using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ChallengeBoard.Web.Extensions;
using ChallengeBoard.Web.Models;
using Raven.Client.Linq;

namespace ChallengeBoard.Web.Controllers {
    public class AdminController : RavenSessionController {
  
        public ActionResult Index() {
            var model = RavenSession.Query<Challenge>().OrderByDescending(m => m.Text).ToList();
            return View(model);
        }

        public ActionResult Count() {
            var users = RavenSession.Query<User>().ToList();
            var challenges = RavenSession.Query<Challenge>().OrderByDescending(m => m.Text).ToList();

            var model = new List<Count>();
           
            foreach (var user in users) {
                var count = new Count() {
                    Name = user.Name + "(" + user.UserName + ")",
                    Points = challenges.Sum(x => x.NumberOfCompletions(user) * x.Points)
                };

                model.Add(count);
            }
            return View(model);
        }

        public ActionResult AddChallenge() {
            var model = new Challenge();
            return View(model);
        }

        [HttpPost]
        public ActionResult AddChallenge(Challenge challenge) {
            RavenSession.Store(challenge);
            return RedirectToAction("AddChallenge");
        }

    }

    public class Count {
        public string Name { get; set; }
        public int Points { get; set; }
    }
}
