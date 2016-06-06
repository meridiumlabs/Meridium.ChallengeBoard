using ChallengeBoard.Web.Models;

namespace ChallengeBoard.Web.Extensions {
    public static class ChallengeIsCompleteExtension {
        public static bool IsComplete(this Challenge challenge, User user) {
            return user.CompletedChallenges.Contains(challenge.Id);
        }
    }
}