using System.Linq;
using ChallengeBoard.Web.Extensions;
using ChallengeBoard.Web.Indexes;
using ChallengeBoard.Web.Models;
using Raven.Client;
using Raven.Client.Linq;

namespace ChallengeBoard.Web.ViewModels {
    public static class BoardViewModelBuilder {
        public static BoardViewModel Build(IDocumentSession ravenSession, User user) {

            var challenges = ravenSession.Query<Challenge>().OrderByDescending(m => m.Text).ToList();

            var model = new BoardViewModel {
                Challenges = challenges.Where(m => m.Hide == false).ToList(),
                TotalPoints = challenges.Sum(x => x.NumberOfCompletions(user) * x.Points),
                CurrentUser = user,
                IsAuthenticated = user.IsAuthenticated(),
                History = ravenSession.Query<Feed, Feed_FeedViewModel>()                
                    .ProjectFromIndexFieldsInto<FeedViewModel>()
                    .Where(x => x.UserId == user.Id)
                    .OrderByDescending(m => m.TimeStamp)
                    .ToList()
            };
            return model;
        }
    }
}