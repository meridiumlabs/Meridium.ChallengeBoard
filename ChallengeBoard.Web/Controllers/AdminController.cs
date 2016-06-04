using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using ChallengeBoard.Web.Core;
using ChallengeBoard.Web.Models;
using ChallengeBoard.Web.Models.Extensions;

namespace ChallengeBoard.Web.Controllers
{
    public class AdminController : RavenSessionController
    {
        //
        // GET: /Admin/

        public ActionResult Index()
        {
            //get all challenges from database
            var model = new List<Challenge>();
            model = RavenService.GetAllChallenges(RavenSession);
            return View(model);
        }
        public ActionResult Count()
        {
            //get all users
            var users = RavenService.GetAllUsers(RavenSession);
            var challenges = RavenService.GetAllChallenges(RavenSession);

            var model = new List<Count>();
            // foreach 
            foreach (var user in users)
            {
                var count = new Count()
                {
                    Name = user.Name + "(" + user.UserName + ")",
                    Points = CalculatePoints(challenges, user)
                };

                model.Add(count);
            }
            //get all activities for user

            return View(model);
        }
        public ActionResult AddChallenge()
        {
            var model = new Challenge();
            return View(model);
        }
        private int CalculatePoints(List<Challenge> challenges, User user)
        {
            var points = 0;
            foreach (Challenge challenge in challenges)
            {
                if (challenge.IsComplete(user))
                {
                    var count = challenge.NumberOfCompletions(user);
                    points += challenge.Points * count;
                }
            }

            return points;
        }
        [HttpPost]
        public ActionResult AddChallenge(Challenge challenge)
        {

            RavenService.SaveChallenge(RavenSession, challenge);

            return RedirectToAction("AddChallenge");
        }

    }

    public class Count
    {
        public string Name { get; set; }
        public int Points { get; set; }
    }
}
