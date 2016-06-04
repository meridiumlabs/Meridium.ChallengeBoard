using System.Collections.Generic;
using ChallengeBoard.Web.Controllers;

namespace ChallengeBoard.Web.Models.ViewModels {
    public class LeaderboardViewModel {
        public List<UserWithTotalPoints> Users { get; set; }
    }
}