using System.Web;
using ChallengeBoard.Web.Models;

namespace ChallengeBoard.Web.Extensions {
    public static class UserIsAuthenticatedExtension {
        public static bool IsAuthenticated(this User user) {
            if (HttpContext.Current.Request.Cookies["AuthID"] == null) return false;
            var authId = HttpContext.Current.Request.Cookies["AuthID"].Value;
            return authId == user.AuthID;
        }
    }
}