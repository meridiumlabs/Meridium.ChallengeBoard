(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChallengeCards = (function () {
    function ChallengeCards(user) {
        _classCallCheck(this, ChallengeCards);

        this.user = user;
        this.registerClickEvent();
    }

    _createClass(ChallengeCards, [{
        key: "registerClickEvent",
        value: function registerClickEvent() {
            var self = this;
            var cards = document.getElementsByClassName("card");
            for (var i = 0; i < cards.length; i++) {
                (function () {
                    cards[i].addEventListener("click", function (e) {
                        e.preventDefault();

                        self.updateChallengeCard(this);
                        self.updateChallengeOnServer(this);
                    });
                    var card = cards[i];
                    var count = cards[i].getElementsByClassName('card-count--subtr');
                    if (count.length == 0) return;

                    count[0].addEventListener("click", function (e) {

                        e.preventDefault();
                        e.stopPropagation();

                        self.updateChallengeCardSubtract(card);
                        self.updateChallengeCardSubtractOnServer(card);
                    });
                })();
            }
        }
    }, {
        key: "updateChallengeCard",
        value: function updateChallengeCard(card) {

            var cardIsMarkedAsComplete = card.classList.contains("card--complete");
            var cardIsSingleOnly = card.classList.contains("card--single");
            var points = card.getAttribute('data-points');

            if (cardIsMarkedAsComplete && cardIsSingleOnly) {
                points = points * -1;
                card.classList.remove("card--complete");
            } else {
                card.classList.add("card--complete");
                if (!cardIsSingleOnly) {
                    var currentCount = card.getElementsByClassName('card-count--number')[0];
                    currentCount.textContent = parseInt(currentCount.textContent) + 1;
                }
            }

            var event = new CustomEvent("challengeCardSaved", { "detail": points });
            document.dispatchEvent(event);
        }
    }, {
        key: "updateChallengeCardSubtract",
        value: function updateChallengeCardSubtract(card) {
            var cardIsMarkedAsComplete = card.classList.contains("card--complete");

            var points = card.getAttribute('data-points');
            //if (cardIsMarkedAsComplete) {
            points = points * -1;
            //} else {
            //card.classList.add("card--complete");
            //}
            console.log(card);
            var currentCount = card.getElementsByClassName('card-count--number')[0];
            currentCount.textContent = parseInt(currentCount.textContent) - 1;
            var event = new CustomEvent("challengeCardSaved", { "detail": points });
            document.dispatchEvent(event);
        }
    }, {
        key: "updateChallengeOnServer",
        value: function updateChallengeOnServer(card) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'Home/ToggleChallenge');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    //Something went wrong message.
                    // return to login form
                    var username = document.getElementById("user-hide").textContent;
                    window.location.href = "/Authentication?name=" + username;
                    return;
                }
            };
            xhr.send(JSON.stringify({
                id: card.getAttribute('data-id'),
                currentUser: this.user,
                single: card.classList.contains("card--single")
            }));
        }
    }, {
        key: "updateChallengeCardSubtractOnServer",
        value: function updateChallengeCardSubtractOnServer(card) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'Home/ToggleChallengeSubtract');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    //Something went wrong message.
                    // return to login form
                    var username = document.getElementById("user-hide").textContent;
                    window.location.href = "/Authentication?name=" + username;
                    return;
                }
            };
            xhr.send(JSON.stringify({
                id: card.getAttribute('data-id'),
                currentUser: this.user
            }));
        }
    }]);

    return ChallengeCards;
})();

module.exports = ChallengeCards;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserInfo = (function () {
    function UserInfo(user) {
        _classCallCheck(this, UserInfo);

        this.user = user;
    }

    _createClass(UserInfo, [{
        key: "init",
        value: function init() {
            this.registerEvents();
        }
    }, {
        key: "registerEvents",
        value: function registerEvents() {
            var _this = this;

            var event = new Event("challengeCardSaved");
            document.addEventListener("challengeCardSaved", function (event) {
                return _this.updateProgressBar(event.detail);
            });
        }
    }, {
        key: "updateProgressBar",
        value: function updateProgressBar(points) {
            console.log(points);
            var scoreboard = document.getElementById('intro-score');
            var currentPoints = parseInt(scoreboard.textContent);
            var newScore = currentPoints + parseInt(points);
            scoreboard.textContent = newScore;
        }
    }]);

    return UserInfo;
})();

module.exports = UserInfo;

},{}],3:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ModulesChallengeCards = require("./Modules/ChallengeCards");

var _ModulesChallengeCards2 = _interopRequireDefault(_ModulesChallengeCards);

var _ModulesUserInfo = require("./Modules/UserInfo");

var _ModulesUserInfo2 = _interopRequireDefault(_ModulesUserInfo);

document.addEventListener("DOMContentLoaded", function (event) {

    setTimeout(function () {
        document.getElementById("wrap").classList.add('wrap--init');
    }, 400);

    var placeholders = $('.form__item__textbox');

    placeholders.keypress(function () {
        //if($(this).val().length > 0) {
        $(this).addClass("form__item__textbox--hasvalue");
        //}
    });
    placeholders.keyup(function () {
        if ($(this).val().length == 0) {
            $(this).removeClass("form__item__textbox--hasvalue");
        }
    });

    var username = document.getElementById("user-hide");

    if (!username) {
        return;
    }

    var challengeCards = new _ModulesChallengeCards2["default"](username.textContent);
    var userInfo = new _ModulesUserInfo2["default"](username.textContent);

    userInfo.init();

    var cards = document.getElementById('Cards');

    document.getElementById("notifications-toggle").addEventListener("click", function (e) {
        e.preventDefault();
        var container = document.getElementById('history-feed');
        if (container.classList.contains('hidden')) {
            this.classList.add('header__actions__icon--expanded');
            container.classList.remove('hidden');
            setTimeout(function () {
                container.classList.add("notifications--init");
            }, 50);
        } else {
            this.classList.remove('header__actions__icon--expanded');
            container.classList.remove("notifications--init");
            setTimeout(function () {
                container.classList.add('hidden');
            }, 300);
        }
    });

    document.getElementById("leaderboard-toggle").addEventListener("click", function (e) {
        e.preventDefault();

        if (document.getElementsByClassName("leaderboard").length > 0) {
            this.classList.remove('header__actions__icon--expanded');
            var leaderboard = document.getElementById("leaderboard");
            leaderboard.classList.remove("leaderboard--init");
            setTimeout(function () {
                leaderboard.parentElement.removeChild(leaderboard);
            }, 300);
        } else {
            this.classList.add('header__actions__icon--expanded');
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    document.body.insertAdjacentHTML("beforeend", xhr.responseText);
                    setTimeout(function () {
                        document.getElementById("leaderboard").classList.add("leaderboard--init");
                    }, 50);
                }
            };
            xhr.open('POST', 'leaderboard', true);
            xhr.send(null);
        }
    });
});

},{"./Modules/ChallengeCards":1,"./Modules/UserInfo":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOi9HaXQvTWVyaWRpdW0uQ2hhbGxlbmdlQm9hcmQvQ2hhbGxlbmdlQm9hcmQuV2ViL0NvbnRlbnQvU2NyaXB0cy9Nb2R1bGVzL0NoYWxsZW5nZUNhcmRzLmpzIiwiYzovR2l0L01lcmlkaXVtLkNoYWxsZW5nZUJvYXJkL0NoYWxsZW5nZUJvYXJkLldlYi9Db250ZW50L1NjcmlwdHMvTW9kdWxlcy9Vc2VySW5mby5qcyIsImM6L0dpdC9NZXJpZGl1bS5DaGFsbGVuZ2VCb2FyZC9DaGFsbGVuZ2VCb2FyZC5XZWIvQ29udGVudC9TY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxjQUFjO0FBQ0wsYUFEVCxjQUFjLENBQ0osSUFBSSxFQUFFOzhCQURoQixjQUFjOztBQUVaLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzdCOztpQkFKQyxjQUFjOztlQUtFLDhCQUFHO0FBQ2pCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsZ0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsQUFBQyxpQkFBQSxZQUFXO0FBQ1IseUJBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDM0MseUJBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFbkIsNEJBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQiw0QkFBSSxDQUFDLHVCQUF1QixDQUFD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QUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekQsdUJBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDbEQsc0JBQVUsQ0FBQyxZQUFXO0FBQ2xCLDJCQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN0RCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1gsTUFDSTtBQUNELGdCQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RELGdCQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQy9CLGVBQUcsQ0FBQyxrQkFBa0IsR0FBRyxZQUFXO0FBQ2hDLG9CQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksRUFBRTtBQUN2Qyw0QkFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hFLDhCQUFVLENBQUMsWUFBVztBQUNsQixnQ0FBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7cUJBQzdFLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ1Y7YUFDSixDQUFBO0FBQ0QsZUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLGVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEI7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQ2hhbGxlbmdlQ2FyZHMge1xyXG4gICAgY29uc3RydWN0b3IodXNlcikge1xyXG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckNsaWNrRXZlbnQoKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyQ2xpY2tFdmVudCgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhcmRcIik7ICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUNoYWxsZW5nZUNhcmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVDaGFsbGVuZ2VPblNlcnZlcih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBjYXJkID0gY2FyZHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSBjYXJkc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJkLWNvdW50LS1zdWJ0cicpO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvdW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hhbGxlbmdlQ2FyZFN1YnRyYWN0KGNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hhbGxlbmdlQ2FyZFN1YnRyYWN0T25TZXJ2ZXIoY2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVDaGFsbGVuZ2VDYXJkKGNhcmQpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2FyZElzTWFya2VkQXNDb21wbGV0ZSA9IGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZC0tY29tcGxldGVcIik7XHJcbiAgICAgICAgdmFyIGNhcmRJc1NpbmdsZU9ubHkgPSBjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmQtLXNpbmdsZVwiKTtcclxuICAgICAgICB2YXIgcG9pbnRzID0gY2FyZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9pbnRzJyk7XHJcblxyXG4gICAgICAgIGlmIChjYXJkSXNNYXJrZWRBc0NvbXBsZXRlICYmIGNhcmRJc1NpbmdsZU9ubHkpIHtcclxuICAgICAgICAgICAgcG9pbnRzID0gcG9pbnRzICogLTE7XHJcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZShcImNhcmQtLWNvbXBsZXRlXCIpOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoXCJjYXJkLS1jb21wbGV0ZVwiKTsgXHJcbiAgICAgICAgICAgIGlmKCFjYXJkSXNTaW5nbGVPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudENvdW50ID0gY2FyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJkLWNvdW50LS1udW1iZXInKVswXTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb3VudC50ZXh0Q29udGVudCA9IHBhcnNlSW50KGN1cnJlbnRDb3VudC50ZXh0Q29udGVudCkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYWxsZW5nZUNhcmRTYXZlZFwiLCB7IFwiZGV0YWlsXCI6IHBvaW50cyB9KTtcclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUNoYWxsZW5nZUNhcmRTdWJ0cmFjdChjYXJkKSB7XHJcbiAgICAgICAgdmFyIGNhcmRJc01hcmtlZEFzQ29tcGxldGUgPSBjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmQtLWNvbXBsZXRlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwb2ludHMgPSBjYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1wb2ludHMnKTtcclxuICAgICAgICAvL2lmIChjYXJkSXNNYXJrZWRBc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHBvaW50cyA9IHBvaW50cyAqIC0xO1xyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jYXJkLmNsYXNzTGlzdC5hZGQoXCJjYXJkLS1jb21wbGV0ZVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICBjb25zb2xlLmxvZyhjYXJkKTtcclxuICAgICAgICB2YXIgY3VycmVudENvdW50ID0gY2FyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJkLWNvdW50LS1udW1iZXInKVswXTtcclxuICAgICAgICBjdXJyZW50Q291bnQudGV4dENvbnRlbnQgPSBwYXJzZUludChjdXJyZW50Q291bnQudGV4dENvbnRlbnQpIC0gMTtcclxuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJjaGFsbGVuZ2VDYXJkU2F2ZWRcIiwgeyBcImRldGFpbFwiOiBwb2ludHMgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVDaGFsbGVuZ2VPblNlcnZlcihjYXJkKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnSG9tZS9Ub2dnbGVDaGFsbGVuZ2UnKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL1NvbWV0aGluZyB3ZW50IHdyb25nIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdG8gbG9naW4gZm9ybVxyXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyLWhpZGVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0F1dGhlbnRpY2F0aW9uP25hbWU9XCIgKyB1c2VybmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHsgXHJcbiAgICAgICAgICAgIGlkOiBjYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICBjdXJyZW50VXNlcjogdGhpcy51c2VyLFxyXG4gICAgICAgICAgICBzaW5nbGU6IGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZC0tc2luZ2xlXCIpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ2hhbGxlbmdlQ2FyZFN1YnRyYWN0T25TZXJ2ZXIoY2FyZCkgeyAgICAgICAgXHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgJ0hvbWUvVG9nZ2xlQ2hhbGxlbmdlU3VidHJhY3QnKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL1NvbWV0aGluZyB3ZW50IHdyb25nIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdG8gbG9naW4gZm9ybVxyXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyLWhpZGVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0F1dGhlbnRpY2F0aW9uP25hbWU9XCIgKyB1c2VybmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBpZDogY2FyZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSxcclxuICAgICAgICAgICAgY3VycmVudFVzZXI6IHRoaXMudXNlclxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IENoYWxsZW5nZUNhcmRzOyIsImNsYXNzIFVzZXJJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKHVzZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyOyAgICAgICAgXHJcbiAgICB9XHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudChcImNoYWxsZW5nZUNhcmRTYXZlZFwiKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbGxlbmdlQ2FyZFNhdmVkXCIsIGV2ZW50ID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoZXZlbnQuZGV0YWlsKSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgdXBkYXRlUHJvZ3Jlc3NCYXIocG9pbnRzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pbnRzKTtcclxuICAgICAgICB2YXIgc2NvcmVib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyby1zY29yZScpO1xyXG4gICAgICAgIHZhciBjdXJyZW50UG9pbnRzID0gcGFyc2VJbnQoc2NvcmVib2FyZC50ZXh0Q29udGVudCk7ICAgICAgICBcclxuICAgICAgICB2YXIgbmV3U2NvcmUgPSBjdXJyZW50UG9pbnRzICsgcGFyc2VJbnQocG9pbnRzKTtcclxuICAgICAgICBzY29yZWJvYXJkLnRleHRDb250ZW50ID0gbmV3U2NvcmU7ICAgICAgICAgICAgXHJcbiAgICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VySW5mbzsiLCJpbXBvcnQgQ2hhbGxlbmdlQ2FyZHMgZnJvbSBcIi4vTW9kdWxlcy9DaGFsbGVuZ2VDYXJkc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4vTW9kdWxlcy9Vc2VySW5mb1wiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIFxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3cmFwXCIpLmNsYXNzTGlzdC5hZGQoJ3dyYXAtLWluaXQnKTtcclxuICAgIH0sIDQwMCk7XHJcblxyXG5cclxuXHJcbiAgICBcclxuICAgIHZhciBwbGFjZWhvbGRlcnMgPSAkKCcuZm9ybV9faXRlbV9fdGV4dGJveCcpO1xyXG4gICBcclxuICAgIHBsYWNlaG9sZGVycy5rZXlwcmVzcyhmdW5jdGlvbigpIHtcclxuICAgICAgICAvL2lmKCQodGhpcykudmFsKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZm9ybV9faXRlbV9fdGV4dGJveC0taGFzdmFsdWVcIik7XHJcbiAgICAgICAgLy99XHJcbiAgICB9KTtcclxuICAgIHBsYWNlaG9sZGVycy5rZXl1cChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZigkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmb3JtX19pdGVtX190ZXh0Ym94LS1oYXN2YWx1ZVwiKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlci1oaWRlXCIpO1xyXG5cclxuICAgIGlmICghdXNlcm5hbWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNoYWxsZW5nZUNhcmRzID0gbmV3IENoYWxsZW5nZUNhcmRzKHVzZXJuYW1lLnRleHRDb250ZW50KTtcclxuICAgIHZhciB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh1c2VybmFtZS50ZXh0Q29udGVudCk7XHJcblxyXG4gICAgdXNlckluZm8uaW5pdCgpO1xyXG5cclxuICAgIHZhciBjYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDYXJkcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90aWZpY2F0aW9ucy10b2dnbGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaXN0b3J5LWZlZWQnKTtcclxuICAgICAgICBpZiAoY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2FjdGlvbnNfX2ljb24tLWV4cGFuZGVkJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm90aWZpY2F0aW9ucy0taW5pdFwiKTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX19hY3Rpb25zX19pY29uLS1leHBhbmRlZCcpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5vdGlmaWNhdGlvbnMtLWluaXRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlYWRlcmJvYXJkLXRvZ2dsZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGVhZGVyYm9hcmRcIikubGVuZ3RoID4gMCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fYWN0aW9uc19faWNvbi0tZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgdmFyIGxlYWRlcmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWFkZXJib2FyZFwiKTtcclxuICAgICAgICAgICAgbGVhZGVyYm9hcmQuY2xhc3NMaXN0LnJlbW92ZShcImxlYWRlcmJvYXJkLS1pbml0XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZWFkZXJib2FyZC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGxlYWRlcmJvYXJkKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fYWN0aW9uc19faWNvbi0tZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVhZGVyYm9hcmRcIikuY2xhc3NMaXN0LmFkZChcImxlYWRlcmJvYXJkLS1pbml0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4aHIub3BlbignUE9TVCcsICdsZWFkZXJib2FyZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7Il19
