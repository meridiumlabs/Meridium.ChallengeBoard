using System.Linq;
using System.Web.Mvc;
using ChallengeBoard.Web.Models;
using ChallengeBoard.Web.Models.ViewModels;
using Raven.Abstractions.Indexing;
using Raven.Client;
using Raven.Client.Indexes;

namespace ChallengeBoard.Web.Controllers
{
    public class LeaderboardController : RavenSessionController
    {
        [HttpPost]
        public ActionResult Index()
        {
          

            var model = new LeaderboardViewModel {
                Users = RavenSession.Query<User, User_TotalPoints>()
                    .ProjectFromIndexFieldsInto<UserWithTotalPoints>()                    
                    .OrderByDescending(x => x.TotalPoints)
                    .Take(10)
                    .ToList()
            };

            return PartialView(model);
        }     

    }

    public class UserWithTotalPoints : User {
        public int TotalPoints { get; set; }
    }

    public class User_TotalPoints : AbstractIndexCreationTask<User, User_TotalPoints.Result> {
        public class Result {
            public int TotalPoints { get; set; }
        }
        public User_TotalPoints() {
            Map = users =>
                from user in users
                where user.IsPublic
                select new {
                    TotalPoints = user.CompletedChallenges.Sum(x => LoadDocument<Challenge>(x).Points)
                };
            Stores.Add(x => x.TotalPoints, FieldStorage.Yes);
        }
    }
}
