using System;
using System.Web;
using ChallengeBoard.Web.Models;

namespace ChallengeBoard.Web.Extensions {
    public static class UserSetAuthenticationCookie {
        public static void SetAuthenticationCookie(this User user) {
            var cookie = new HttpCookie("AuthID") {
                Value = user.AuthID,
                Expires = new DateTime(2020, 12, 31)
            };
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}