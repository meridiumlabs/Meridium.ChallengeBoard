using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ChallengeBoard.Web.Models {
    public class User {
        public User() {
            CompletedChallenges = new List<string>();
        }
        public string Id { get; set; }
        public string AuthID { get; set; }
        [DisplayName("Användarnamn")]
        [Required]
        public string UserName { get; set; }
        [DisplayName("För- och efternamn")]
        [Required]
        public string Name { get; set; }
        [DisplayName("Lösenord")]
        [Required]
        public string Password { get; set; }
        [DisplayName("Visa publikt")]
        public bool IsPublic { get; set; }
        public List<string> CompletedChallenges { get; set; }
    }
}