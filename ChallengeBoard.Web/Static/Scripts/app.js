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
                cards[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    self.updateChallengeCard(this);
                    self.updateChallengeOnServer(this);
                });
            }
        }
    }, {
        key: "updateChallengeCard",
        value: function updateChallengeCard(card) {
            var cardIsMarkedAsComplete = card.classList.contains("card--complete");
            card.classList.toggle("card--complete");
            var points = card.getAttribute('data-points');
            if (cardIsMarkedAsComplete) {
                points = points * -1;
            }

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
                    var username = document.getElementById("user-hide").innerText;
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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var progressbar = require('progressbar.js');

var UserInfo = (function () {
    function UserInfo(user) {
        _classCallCheck(this, UserInfo);

        this.user = user;
        this.progressBar = new progressbar.Circle('#ProgressBarContainer', {
            color: '#00cc99',
            strokeWidth: 3,
            easing: 'easeInOut'
        });
        this.registerEvents();
    }

    _createClass(UserInfo, [{
        key: 'registerEvents',
        value: function registerEvents() {
            var _this = this;

            document.addEventListener("challengeCardSaved", function (event) {
                return _this.updateProgressBar(event.detail);
            });
        }
    }, {
        key: 'initProgressBar',
        value: function initProgressBar() {
            var currentPoints = parseFloat(document.getElementById('intro-score').innerText);
            var maxScore = parseFloat(document.getElementById('max-score').innerText);
            var progress = currentPoints / maxScore;
            this.progressBar.animate(progress);
        }
    }, {
        key: 'updateProgressBar',
        value: function updateProgressBar(points) {
            console.log(points);
            var scoreboard = document.getElementById('intro-score');
            var currentPoints = parseInt(scoreboard.innerText);

            var newScore = currentPoints + parseInt(points);
            scoreboard.innerText = newScore;
            var progress = parseFloat(scoreboard.innerText) / parseFloat(document.getElementById('max-score').innerText);
            this.progressBar.animate(progress);

            //update bonus rings
            if (newScore >= 100) {

                var level = document.getElementById('bonus-level-one');
                if (!level.classList.contains("fulfilled")) {
                    level.classList.add("fulfilled");
                }
            } else {

                var level = document.getElementById('bonus-level-one');
                if (level.classList.contains("fulfilled")) {
                    level.classList.remove("fulfilled");
                }
            }
            if (currentPoints >= 350) {
                //alert("100 eller mer");
                var level = document.getElementById('bonus-level-two');
                if (!level.classList.contains("fulfilled")) {
                    level.classList.add("fulfilled");
                }
            } else {
                //alert("mindre �n 100");
                var level = document.getElementById('bonus-level-two');
                if (level.classList.contains("fulfilled")) {
                    level.classList.remove("fulfilled");
                }
            }

            if (currentPoints >= 500) {
                var level = document.getElementById('bonus-level-three');
                if (!level.classList.contains("fulfilled")) {
                    level.classList.add("fulfilled");
                }
            } else {
                var level = document.getElementById('bonus-level-three');
                if (level.classList.contains("fulfilled")) {
                    level.classList.remove("fulfilled");
                }
            }
            if (currentPoints >= 750) {
                var level = document.getElementById('bonus-level-four');
                if (!level.classList.contains("fulfilled")) {
                    level.classList.add("fulfilled");
                }
            } else {
                var level = document.getElementById('bonus-level-four');
                if (level.classList.contains("fulfilled")) {
                    level.classList.remove("fulfilled");
                }
            }
            if (currentPoints >= 1000) {
                var level = document.getElementById('bonus-level-five');
                if (!level.classList.contains("fulfilled")) {
                    level.classList.add("fulfilled");
                }
            } else {
                var level = document.getElementById('bonus-level-five');
                if (level.classList.contains("fulfilled")) {
                    level.classList.remove("fulfilled");
                }
            }
        }
    }]);

    return UserInfo;
})();

module.exports = UserInfo;

},{"progressbar.js":7}],3:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ModulesChallengeCards = require("./Modules/ChallengeCards");

var _ModulesChallengeCards2 = _interopRequireDefault(_ModulesChallengeCards);

var _ModulesUserInfo = require("./Modules/UserInfo");

var _ModulesUserInfo2 = _interopRequireDefault(_ModulesUserInfo);

document.addEventListener("DOMContentLoaded", function (event) {
    var username = document.getElementById("user-hide").innerText;

    var challengeCards = new _ModulesChallengeCards2["default"](username);
    var userInfo = new _ModulesUserInfo2["default"](username);

    userInfo.initProgressBar();

    var cards = document.getElementById('Cards');
});
/*var msnry = new Masonry( cards, {
  itemSelector: '.item',
  columnWidth: 220
});*/

},{"./Modules/ChallengeCards":1,"./Modules/UserInfo":2}],4:[function(require,module,exports){
/*! shifty - v1.2.2 - 2014-10-09 - http://jeremyckahn.github.io/shifty */
;(function (root) {

/*!
 * Shifty Core
 * By Jeremy Kahn - jeremyckahn@gmail.com
 */

// UglifyJS define hack.  Used for unit testing.  Contents of this if are
// compiled away.
if (typeof SHIFTY_DEBUG_NOW === 'undefined') {
  SHIFTY_DEBUG_NOW = function () {
    return +new Date();
  };
}

var Tweenable = (function () {

  'use strict';

  // Aliases that get defined later in this function
  var formula;

  // CONSTANTS
  var DEFAULT_SCHEDULE_FUNCTION;
  var DEFAULT_EASING = 'linear';
  var DEFAULT_DURATION = 500;
  var UPDATE_TIME = 1000 / 60;

  var _now = Date.now
       ? Date.now
       : function () {return +new Date();};

  var now = SHIFTY_DEBUG_NOW
       ? SHIFTY_DEBUG_NOW
       : _now;

  if (typeof window !== 'undefined') {
    // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame
       || window.webkitRequestAnimationFrame
       || window.oRequestAnimationFrame
       || window.msRequestAnimationFrame
       || (window.mozCancelRequestAnimationFrame
       && window.mozRequestAnimationFrame)
       || setTimeout;
  } else {
    DEFAULT_SCHEDULE_FUNCTION = setTimeout;
  }

  function noop () {
    // NOOP!
  }

  /*!
   * Handy shortcut for doing a for-in loop. This is not a "normal" each
   * function, it is optimized for Shifty.  The iterator function only receives
   * the property name, not the value.
   * @param {Object} obj
   * @param {Function(string)} fn
   */
  function each (obj, fn) {
    var key;
    for (key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        fn(key);
      }
    }
  }

  /*!
   * Perform a shallow copy of Object properties.
   * @param {Object} targetObject The object to copy into
   * @param {Object} srcObject The object to copy from
   * @return {Object} A reference to the augmented `targetObj` Object
   */
  function shallowCopy (targetObj, srcObj) {
    each(srcObj, function (prop) {
      targetObj[prop] = srcObj[prop];
    });

    return targetObj;
  }

  /*!
   * Copies each property from src onto target, but only if the property to
   * copy to target is undefined.
   * @param {Object} target Missing properties in this Object are filled in
   * @param {Object} src
   */
  function defaults (target, src) {
    each(src, function (prop) {
      if (typeof target[prop] === 'undefined') {
        target[prop] = src[prop];
      }
    });
  }

  /*!
   * Calculates the interpolated tween values of an Object for a given
   * timestamp.
   * @param {Number} forPosition The position to compute the state for.
   * @param {Object} currentState Current state properties.
   * @param {Object} originalState: The original state properties the Object is
   * tweening from.
   * @param {Object} targetState: The destination state properties the Object
   * is tweening to.
   * @param {number} duration: The length of the tween in milliseconds.
   * @param {number} timestamp: The UNIX epoch time at which the tween began.
   * @param {Object} easing: This Object's keys must correspond to the keys in
   * targetState.
   */
  function tweenProps (forPosition, currentState, originalState, targetState,
    duration, timestamp, easing) {
    var normalizedPosition = (forPosition - timestamp) / duration;

    var prop;
    for (prop in currentState) {
      if (currentState.hasOwnProperty(prop)) {
        currentState[prop] = tweenProp(originalState[prop],
          targetState[prop], formula[easing[prop]], normalizedPosition);
      }
    }

    return currentState;
  }

  /*!
   * Tweens a single property.
   * @param {number} start The value that the tween started from.
   * @param {number} end The value that the tween should end at.
   * @param {Function} easingFunc The easing curve to apply to the tween.
   * @param {number} position The normalized position (between 0.0 and 1.0) to
   * calculate the midpoint of 'start' and 'end' against.
   * @return {number} The tweened value.
   */
  function tweenProp (start, end, easingFunc, position) {
    return start + (end - start) * easingFunc(position);
  }

  /*!
   * Applies a filter to Tweenable instance.
   * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
   * upon.
   * @param {String} filterName The name of the filter to apply.
   */
  function applyFilter (tweenable, filterName) {
    var filters = Tweenable.prototype.filter;
    var args = tweenable._filterArgs;

    each(filters, function (name) {
      if (typeof filters[name][filterName] !== 'undefined') {
        filters[name][filterName].apply(tweenable, args);
      }
    });
  }

  var timeoutHandler_endTime;
  var timeoutHandler_currentTime;
  var timeoutHandler_isEnded;
  /*!
   * Handles the update logic for one step of a tween.
   * @param {Tweenable} tweenable
   * @param {number} timestamp
   * @param {number} duration
   * @param {Object} currentState
   * @param {Object} originalState
   * @param {Object} targetState
   * @param {Object} easing
   * @param {Function} step
   * @param {Function(Function,number)}} schedule
   */
  function timeoutHandler (tweenable, timestamp, duration, currentState,
    originalState, targetState, easing, step, schedule) {
    timeoutHandler_endTime = timestamp + duration;
    timeoutHandler_currentTime = Math.min(now(), timeoutHandler_endTime);
    timeoutHandler_isEnded = timeoutHandler_currentTime >= timeoutHandler_endTime;

    if (tweenable.isPlaying() && !timeoutHandler_isEnded) {
      schedule(tweenable._timeoutHandler, UPDATE_TIME);

      applyFilter(tweenable, 'beforeTween');
      tweenProps(timeoutHandler_currentTime, currentState, originalState,
        targetState, duration, timestamp, easing);
      applyFilter(tweenable, 'afterTween');

      step(currentState);
    } else if (timeoutHandler_isEnded) {
      step(targetState);
      tweenable.stop(true);
    }
  }


  /*!
   * Creates a usable easing Object from either a string or another easing
   * Object.  If `easing` is an Object, then this function clones it and fills
   * in the missing properties with "linear".
   * @param {Object} fromTweenParams
   * @param {Object|string} easing
   */
  function composeEasingObject (fromTweenParams, easing) {
    var composedEasing = {};

    if (typeof easing === 'string') {
      each(fromTweenParams, function (prop) {
        composedEasing[prop] = easing;
      });
    } else {
      each(fromTweenParams, function (prop) {
        if (!composedEasing[prop]) {
          composedEasing[prop] = easing[prop] || DEFAULT_EASING;
        }
      });
    }

    return composedEasing;
  }

  /**
   * Tweenable constructor.
   * @param {Object=} opt_initialState The values that the initial tween should start at if a "from" object is not provided to Tweenable#tween.
   * @param {Object=} opt_config See Tweenable.prototype.setConfig()
   * @constructor
   */
  function Tweenable (opt_initialState, opt_config) {
    this._currentState = opt_initialState || {};
    this._configured = false;
    this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;

    // To prevent unnecessary calls to setConfig do not set default configuration here.
    // Only set default configuration immediately before tweening if none has been set.
    if (typeof opt_config !== 'undefined') {
      this.setConfig(opt_config);
    }
  }

  /**
   * Configure and start a tween.
   * @param {Object=} opt_config See Tweenable.prototype.setConfig()
   * @return {Tweenable}
   */
  Tweenable.prototype.tween = function (opt_config) {
    if (this._isTweening) {
      return this;
    }

    // Only set default config if no configuration has been set previously and none is provided now.
    if (opt_config !== undefined || !this._configured) {
      this.setConfig(opt_config);
    }

    this._start(this.get());
    return this.resume();
  };

  /**
   * Sets the tween configuration. `config` may have the following options:
   *
   * - __from__ (_Object=_): Starting position.  If omitted, the current state is used.
   * - __to__ (_Object=_): Ending position.
   * - __duration__ (_number=_): How many milliseconds to animate for.
   * - __start__ (_Function(Object)=_): Function to execute when the tween begins.  Receives the state of the tween as the only parameter.
   * - __step__ (_Function(Object)=_): Function to execute on every tick.  Receives the state of the tween as the only parameter.  This function is not called on the final step of the animation, but `finish` is.
   * - __finish__ (_Function(Object)=_): Function to execute upon tween completion.  Receives the state of the tween as the only parameter.
   * - __easing__ (_Object|string=_): Easing curve name(s) to use for the tween.
   * @param {Object} config
   * @return {Tweenable}
   */
  Tweenable.prototype.setConfig = function (config) {
    config = config || {};
    this._configured = true;

    // Init the internal state
    this._pausedAtTime = null;
    this._start = config.start || noop;
    this._step = config.step || noop;
    this._finish = config.finish || noop;
    this._duration = config.duration || DEFAULT_DURATION;
    this._currentState = config.from || this.get();
    this._originalState = this.get();
    this._targetState = config.to || this.get();
    this._timestamp = now();

    // Aliases used below
    var currentState = this._currentState;
    var targetState = this._targetState;

    // Ensure that there is always something to tween to.
    defaults(targetState, currentState);

    this._easing = composeEasingObject(
      currentState, config.easing || DEFAULT_EASING);

    this._filterArgs =
      [currentState, this._originalState, targetState, this._easing];

    applyFilter(this, 'tweenCreated');
    return this;
  };

  /**
   * Gets the current state.
   * @return {Object}
   */
  Tweenable.prototype.get = function () {
    return shallowCopy({}, this._currentState);
  };

  /**
   * Sets the current state.
   * @param {Object} state
   */
  Tweenable.prototype.set = function (state) {
    this._currentState = state;
  };

  /**
   * Pauses a tween.  Paused tweens can be resumed from the point at which they were paused.  This is different than [`stop()`](#stop), as that method causes a tween to start over when it is resumed.
   * @return {Tweenable}
   */
  Tweenable.prototype.pause = function () {
    this._pausedAtTime = now();
    this._isPaused = true;
    return this;
  };

  /**
   * Resumes a paused tween.
   * @return {Tweenable}
   */
  Tweenable.prototype.resume = function () {
    if (this._isPaused) {
      this._timestamp += now() - this._pausedAtTime;
    }

    this._isPaused = false;
    this._isTweening = true;

    var self = this;
    this._timeoutHandler = function () {
      timeoutHandler(self, self._timestamp, self._duration, self._currentState,
        self._originalState, self._targetState, self._easing, self._step,
        self._scheduleFunction);
    };

    this._timeoutHandler();

    return this;
  };

  /**
   * Stops and cancels a tween.
   * @param {boolean=} gotoEnd If false or omitted, the tween just stops at its current state, and the "finish" handler is not invoked.  If true, the tweened object's values are instantly set to the target values, and "finish" is invoked.
   * @return {Tweenable}
   */
  Tweenable.prototype.stop = function (gotoEnd) {
    this._isTweening = false;
    this._isPaused = false;
    this._timeoutHandler = noop;

    if (gotoEnd) {
      shallowCopy(this._currentState, this._targetState);
      applyFilter(this, 'afterTweenEnd');
      this._finish.call(this, this._currentState);
    }

    return this;
  };

  /**
   * Returns whether or not a tween is running.
   * @return {boolean}
   */
  Tweenable.prototype.isPlaying = function () {
    return this._isTweening && !this._isPaused;
  };

  /**
   * Sets a custom schedule function.
   *
   * If a custom function is not set the default one is used [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame) if available, otherwise [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)).
   *
   * @param {Function(Function,number)} scheduleFunction The function to be called to schedule the next frame to be rendered
   */
  Tweenable.prototype.setScheduleFunction = function (scheduleFunction) {
    this._scheduleFunction = scheduleFunction;
  };

  /**
   * `delete`s all "own" properties.  Call this when the `Tweenable` instance is no longer needed to free memory.
   */
  Tweenable.prototype.dispose = function () {
    var prop;
    for (prop in this) {
      if (this.hasOwnProperty(prop)) {
        delete this[prop];
      }
    }
  };

  /*!
   * Filters are used for transforming the properties of a tween at various
   * points in a Tweenable's life cycle.  See the README for more info on this.
   */
  Tweenable.prototype.filter = {};

  /*!
   * This object contains all of the tweens available to Shifty.  It is extendible - simply attach properties to the Tweenable.prototype.formula Object following the same format at linear.
   *
   * `pos` should be a normalized `number` (between 0 and 1).
   */
  Tweenable.prototype.formula = {
    linear: function (pos) {
      return pos;
    }
  };

  formula = Tweenable.prototype.formula;

  shallowCopy(Tweenable, {
    'now': now
    ,'each': each
    ,'tweenProps': tweenProps
    ,'tweenProp': tweenProp
    ,'applyFilter': applyFilter
    ,'shallowCopy': shallowCopy
    ,'defaults': defaults
    ,'composeEasingObject': composeEasingObject
  });

  // `root` is provided in the intro/outro files.

  // A hook used for unit testing.
  if (typeof SHIFTY_DEBUG_NOW === 'function') {
    root.timeoutHandler = timeoutHandler;
  }

  // Bootstrap Tweenable appropriately for the environment.
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = Tweenable;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {return Tweenable;});
  } else if (typeof root.Tweenable === 'undefined') {
    // Browser: Make `Tweenable` globally accessible.
    root.Tweenable = Tweenable;
  }

  return Tweenable;

} ());

/*!
 * All equations are adapted from Thomas Fuchs' [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert Penner](http://www.robertpenner.com/), all rights reserved. This work is [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */

/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */

;(function () {

  Tweenable.shallowCopy(Tweenable.prototype.formula, {
    easeInQuad: function (pos) {
      return Math.pow(pos, 2);
    },

    easeOutQuad: function (pos) {
      return -(Math.pow((pos - 1), 2) - 1);
    },

    easeInOutQuad: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,2);}
      return -0.5 * ((pos -= 2) * pos - 2);
    },

    easeInCubic: function (pos) {
      return Math.pow(pos, 3);
    },

    easeOutCubic: function (pos) {
      return (Math.pow((pos - 1), 3) + 1);
    },

    easeInOutCubic: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,3);}
      return 0.5 * (Math.pow((pos - 2),3) + 2);
    },

    easeInQuart: function (pos) {
      return Math.pow(pos, 4);
    },

    easeOutQuart: function (pos) {
      return -(Math.pow((pos - 1), 4) - 1);
    },

    easeInOutQuart: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
    },

    easeInQuint: function (pos) {
      return Math.pow(pos, 5);
    },

    easeOutQuint: function (pos) {
      return (Math.pow((pos - 1), 5) + 1);
    },

    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,5);}
      return 0.5 * (Math.pow((pos - 2),5) + 2);
    },

    easeInSine: function (pos) {
      return -Math.cos(pos * (Math.PI / 2)) + 1;
    },

    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
    },

    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },

    easeInExpo: function (pos) {
      return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },

    easeOutExpo: function (pos) {
      return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },

    easeInOutExpo: function (pos) {
      if (pos === 0) {return 0;}
      if (pos === 1) {return 1;}
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2,10 * (pos - 1));}
      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },

    easeInCirc: function (pos) {
      return -(Math.sqrt(1 - (pos * pos)) - 1);
    },

    easeOutCirc: function (pos) {
      return Math.sqrt(1 - Math.pow((pos - 1), 2));
    },

    easeInOutCirc: function (pos) {
      if ((pos /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos * pos) - 1);}
      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },

    easeOutBounce: function (pos) {
      if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeInBack: function (pos) {
      var s = 1.70158;
      return (pos) * pos * ((s + 1) * pos - s);
    },

    easeOutBack: function (pos) {
      var s = 1.70158;
      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },

    easeInOutBack: function (pos) {
      var s = 1.70158;
      if ((pos /= 0.5) < 1) {return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));}
      return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    elastic: function (pos) {
      return -1 * Math.pow(4,-8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
    },

    swingFromTo: function (pos) {
      var s = 1.70158;
      return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
          0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    swingFrom: function (pos) {
      var s = 1.70158;
      return pos * pos * ((s + 1) * pos - s);
    },

    swingTo: function (pos) {
      var s = 1.70158;
      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounce: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    bouncePast: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeFromTo: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
    },

    easeFrom: function (pos) {
      return Math.pow(pos,4);
    },

    easeTo: function (pos) {
      return Math.pow(pos,0.25);
    }
  });

}());

/*!
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 */

/*!
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 *  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 *  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
;(function () {
  // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
  function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
    var ax = 0,bx = 0,cx = 0,ay = 0,by = 0,cy = 0;
    function sampleCurveX(t) {return ((ax * t + bx) * t + cx) * t;}
    function sampleCurveY(t) {return ((ay * t + by) * t + cy) * t;}
    function sampleCurveDerivativeX(t) {return (3.0 * ax * t + 2.0 * bx) * t + cx;}
    function solveEpsilon(duration) {return 1.0 / (200.0 * duration);}
    function solve(x,epsilon) {return sampleCurveY(solveCurveX(x,epsilon));}
    function fabs(n) {if (n >= 0) {return n;}else {return 0 - n;}}
    function solveCurveX(x,epsilon) {
      var t0,t1,t2,x2,d2,i;
      for (t2 = x, i = 0; i < 8; i++) {x2 = sampleCurveX(t2) - x; if (fabs(x2) < epsilon) {return t2;} d2 = sampleCurveDerivativeX(t2); if (fabs(d2) < 1e-6) {break;} t2 = t2 - x2 / d2;}
      t0 = 0.0; t1 = 1.0; t2 = x; if (t2 < t0) {return t0;} if (t2 > t1) {return t1;}
      while (t0 < t1) {x2 = sampleCurveX(t2); if (fabs(x2 - x) < epsilon) {return t2;} if (x > x2) {t0 = t2;}else {t1 = t2;} t2 = (t1 - t0) * 0.5 + t0;}
      return t2; // Failure.
    }
    cx = 3.0 * p1x; bx = 3.0 * (p2x - p1x) - cx; ax = 1.0 - cx - bx; cy = 3.0 * p1y; by = 3.0 * (p2y - p1y) - cy; ay = 1.0 - cy - by;
    return solve(t, solveEpsilon(duration));
  }
  /*!
   *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
   *
   *  Generates a transition easing function that is compatible
   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
   *  CSS property.
   *
   *  The W3C has more information about
   *  <a href="http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag">
   *  CSS3 transition timing functions</a>.
   *
   *  @param {number} x1
   *  @param {number} y1
   *  @param {number} x2
   *  @param {number} y2
   *  @return {function}
   */
  function getCubicBezierTransition (x1, y1, x2, y2) {
    return function (pos) {
      return cubicBezierAtTime(pos,x1,y1,x2,y2,1);
    };
  }
  // End ported code

  /**
   * Creates a Bezier easing function and attaches it to `Tweenable.prototype.formula`.  This function gives you total control over the easing curve.  Matthew Lein's [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing the curves you can make with this function.
   *
   * @param {string} name The name of the easing curve.  Overwrites the old easing function on Tweenable.prototype.formula if it exists.
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {function} The easing function that was attached to Tweenable.prototype.formula.
   */
  Tweenable.setBezierFunction = function (name, x1, y1, x2, y2) {
    var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
    cubicBezierTransition.x1 = x1;
    cubicBezierTransition.y1 = y1;
    cubicBezierTransition.x2 = x2;
    cubicBezierTransition.y2 = y2;

    return Tweenable.prototype.formula[name] = cubicBezierTransition;
  };


  /**
   * `delete`s an easing function from `Tweenable.prototype.formula`.  Be careful with this method, as it `delete`s whatever easing formula matches `name` (which means you can delete default Shifty easing functions).
   *
   * @param {string} name The name of the easing function to delete.
   * @return {function}
   */
  Tweenable.unsetBezierFunction = function (name) {
    delete Tweenable.prototype.formula[name];
  };

})();

;(function () {

  function getInterpolatedValues (
    from, current, targetState, position, easing) {
    return Tweenable.tweenProps(
      position, current, from, targetState, 1, 0, easing);
  }

  // Fake a Tweenable and patch some internals.  This approach allows us to
  // skip uneccessary processing and object recreation, cutting down on garbage
  // collection pauses.
  var mockTweenable = new Tweenable();
  mockTweenable._filterArgs = [];

  /**
   * Compute the midpoint of two Objects.  This method effectively calculates a specific frame of animation that [Tweenable#tween](shifty.core.js.html#tween) does many times over the course of a tween.
   *
   * Example:
   *
   * ```
   *  var interpolatedValues = Tweenable.interpolate({
   *    width: '100px',
   *    opacity: 0,
   *    color: '#fff'
   *  }, {
   *    width: '200px',
   *    opacity: 1,
   *    color: '#000'
   *  }, 0.5);
   *
   *  console.log(interpolatedValues);
   *  // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
   * ```
   *
   * @param {Object} from The starting values to tween from.
   * @param {Object} targetState The ending values to tween to.
   * @param {number} position The normalized position value (between 0.0 and 1.0) to interpolate the values between `from` and `to` for.  `from` represents 0 and `to` represents `1`.
   * @param {string|Object} easing The easing curve(s) to calculate the midpoint against.  You can reference any easing function attached to `Tweenable.prototype.formula`.  If omitted, this defaults to "linear".
   * @return {Object}
   */
  Tweenable.interpolate = function (from, targetState, position, easing) {
    var current = Tweenable.shallowCopy({}, from);
    var easingObject = Tweenable.composeEasingObject(
      from, easing || 'linear');

    mockTweenable.set({});

    // Alias and reuse the _filterArgs array instead of recreating it.
    var filterArgs = mockTweenable._filterArgs;
    filterArgs.length = 0;
    filterArgs[0] = current;
    filterArgs[1] = from;
    filterArgs[2] = targetState;
    filterArgs[3] = easingObject;

    // Any defined value transformation must be applied
    Tweenable.applyFilter(mockTweenable, 'tweenCreated');
    Tweenable.applyFilter(mockTweenable, 'beforeTween');

    var interpolatedValues = getInterpolatedValues(
      from, current, targetState, position, easingObject);

    // Transform values back into their original format
    Tweenable.applyFilter(mockTweenable, 'afterTween');

    return interpolatedValues;
  };

}());

/**
 * Adds string interpolation support to Shifty.
 *
 * The Token extension allows Shifty to tween numbers inside of strings.  Among other things, this allows you to animate CSS properties.  For example, you can do this:
 *
 * ```
 * var tweenable = new Tweenable();
 * tweenable.tween({
 *   from: { transform: 'translateX(45px)'},
 *   to: { transform: 'translateX(90xp)'}
 * });
 * ```
 *
 * `translateX(45)` will be tweened to `translateX(90)`.  To demonstrate:
 *
 * ```
 * var tweenable = new Tweenable();
 * tweenable.tween({
 *   from: { transform: 'translateX(45px)'},
 *   to: { transform: 'translateX(90px)'},
 *   step: function (state) {
 *     console.log(state.transform);
 *   }
 * });
 * ```
 *
 * The above snippet will log something like this in the console:
 *
 * ```
 * translateX(60.3px)
 * ...
 * translateX(76.05px)
 * ...
 * translateX(90px)
 * ```
 *
 * Another use for this is animating colors:
 *
 * ```
 * var tweenable = new Tweenable();
 * tweenable.tween({
 *   from: { color: 'rgb(0,255,0)'},
 *   to: { color: 'rgb(255,0,255)'},
 *   step: function (state) {
 *     console.log(state.color);
 *   }
 * });
 * ```
 *
 * The above snippet will log something like this:
 *
 * ```
 * rgb(84,170,84)
 * ...
 * rgb(170,84,170)
 * ...
 * rgb(255,0,255)
 * ```
 *
 * This extension also supports hexadecimal colors, in both long (`#ff00ff`) and short (`#f0f`) forms.  Be aware that hexadecimal input values will be converted into the equivalent RGB output values.  This is done to optimize for performance.
 *
 * ```
 * var tweenable = new Tweenable();
 * tweenable.tween({
 *   from: { color: '#0f0'},
 *   to: { color: '#f0f'},
 *   step: function (state) {
 *     console.log(state.color);
 *   }
 * });
 * ```
 *
 * This snippet will generate the same output as the one before it because equivalent values were supplied (just in hexadecimal form rather than RGB):
 *
 * ```
 * rgb(84,170,84)
 * ...
 * rgb(170,84,170)
 * ...
 * rgb(255,0,255)
 * ```
 *
 * ## Easing support
 *
 * Easing works somewhat differently in the Token extension.  This is because some CSS properties have multiple values in them, and you might need to tween each value along its own easing curve.  A basic example:
 *
 * ```
 * var tweenable = new Tweenable();
 * tweenable.tween({
 *   from: { transform: 'translateX(0px) translateY(0px)'},
 *   to: { transform:   'translateX(100px) translateY(100px)'},
 *   easing: { transform: 'easeInQuad' },
 *   step: function (state) {
 *     console.log(state.transform);
 *   }
 * });
 * ```
 *
 * The above snippet create values like this:
 *
 * ```
 * translateX(11.560000000000002px) translateY(11.560000000000002px)
 * ...
 * translateX(46.24000000000001px) translateY(46.24000000000001px)
 * ...
 * translateX(100px) translateY(100px)
 * ```
 *
 * In this case, the values for `translateX` and `translateY` are always the same for each step of the tween, because they have the same start and end points and both use the same easing curve.  We can also tween `translateX` and `translateY` along independent curves:
 *
 * ```
 * var tweenable = new Tweenable();
 * tweenable.tween({
 *   from: { transform: 'translateX(0px) translateY(0px)'},
 *   to: { transform:   'translateX(100px) translateY(100px)'},
 *   easing: { transform: 'easeInQuad bounce' },
 *   step: function (state) {
 *     console.log(state.transform);
 *   }
 * });
 * ```
 *
 * The above snippet create values like this:
 *
 * ```
 * translateX(10.89px) translateY(82.355625px)
 * ...
 * translateX(44.89000000000001px) translateY(86.73062500000002px)
 * ...
 * translateX(100px) translateY(100px)
 * ```
 *
 * `translateX` and `translateY` are not in sync anymore, because `easeInQuad` was specified for `translateX` and `bounce` for `translateY`.  Mixing and matching easing curves can make for some interesting motion in your animations.
 *
 * The order of the space-separated easing curves correspond the token values they apply to.  If there are more token values than easing curves listed, the last easing curve listed is used.
 */
function token () {
  // Functionality for this extension runs implicitly if it is loaded.
} /*!*/

// token function is defined above only so that dox-foundation sees it as
// documentation and renders it.  It is never used, and is optimized away at
// build time.

;(function (Tweenable) {

  /*!
   * @typedef {{
   *   formatString: string
   *   chunkNames: Array.<string>
   * }}
   */
  var formatManifest;

  // CONSTANTS

  var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
  var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
  var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
  var R_RGB = new RegExp(
    'rgb\\(' + R_UNFORMATTED_VALUES.source +
    (/,\s*/.source) + R_UNFORMATTED_VALUES.source +
    (/,\s*/.source) + R_UNFORMATTED_VALUES.source + '\\)', 'g');
  var R_RGB_PREFIX = /^.*\(/;
  var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
  var VALUE_PLACEHOLDER = 'VAL';

  // HELPERS

  var getFormatChunksFrom_accumulator = [];
  /*!
   * @param {Array.number} rawValues
   * @param {string} prefix
   *
   * @return {Array.<string>}
   */
  function getFormatChunksFrom (rawValues, prefix) {
    getFormatChunksFrom_accumulator.length = 0;

    var rawValuesLength = rawValues.length;
    var i;

    for (i = 0; i < rawValuesLength; i++) {
      getFormatChunksFrom_accumulator.push('_' + prefix + '_' + i);
    }

    return getFormatChunksFrom_accumulator;
  }

  /*!
   * @param {string} formattedString
   *
   * @return {string}
   */
  function getFormatStringFrom (formattedString) {
    var chunks = formattedString.match(R_FORMAT_CHUNKS);

    if (!chunks) {
      // chunks will be null if there were no tokens to parse in
      // formattedString (for example, if formattedString is '2').  Coerce
      // chunks to be useful here.
      chunks = ['', ''];

      // If there is only one chunk, assume that the string is a number
      // followed by a token...
      // NOTE: This may be an unwise assumption.
    } else if (chunks.length === 1 ||
        // ...or if the string starts with a number component (".", "-", or a
        // digit)...
        formattedString[0].match(R_NUMBER_COMPONENT)) {
      // ...prepend an empty string here to make sure that the formatted number
      // is properly replaced by VALUE_PLACEHOLDER
      chunks.unshift('');
    }

    return chunks.join(VALUE_PLACEHOLDER);
  }

  /*!
   * Convert all hex color values within a string to an rgb string.
   *
   * @param {Object} stateObject
   *
   * @return {Object} The modified obj
   */
  function sanitizeObjectForHexProps (stateObject) {
    Tweenable.each(stateObject, function (prop) {
      var currentProp = stateObject[prop];

      if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
        stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
      }
    });
  }

  /*!
   * @param {string} str
   *
   * @return {string}
   */
  function  sanitizeHexChunksToRGB (str) {
    return filterStringChunks(R_HEX, str, convertHexToRGB);
  }

  /*!
   * @param {string} hexString
   *
   * @return {string}
   */
  function convertHexToRGB (hexString) {
    var rgbArr = hexToRGBArray(hexString);
    return 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')';
  }

  var hexToRGBArray_returnArray = [];
  /*!
   * Convert a hexadecimal string to an array with three items, one each for
   * the red, blue, and green decimal values.
   *
   * @param {string} hex A hexadecimal string.
   *
   * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
   * valid string, or an Array of three 0's.
   */
  function hexToRGBArray (hex) {

    hex = hex.replace(/#/, '');

    // If the string is a shorthand three digit hex notation, normalize it to
    // the standard six digit notation
    if (hex.length === 3) {
      hex = hex.split('');
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
    hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
    hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));

    return hexToRGBArray_returnArray;
  }

  /*!
   * Convert a base-16 number to base-10.
   *
   * @param {Number|String} hex The value to convert
   *
   * @returns {Number} The base-10 equivalent of `hex`.
   */
  function hexToDec (hex) {
    return parseInt(hex, 16);
  }

  /*!
   * Runs a filter operation on all chunks of a string that match a RegExp
   *
   * @param {RegExp} pattern
   * @param {string} unfilteredString
   * @param {function(string)} filter
   *
   * @return {string}
   */
  function filterStringChunks (pattern, unfilteredString, filter) {
    var pattenMatches = unfilteredString.match(pattern);
    var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);

    if (pattenMatches) {
      var pattenMatchesLength = pattenMatches.length;
      var currentChunk;

      for (var i = 0; i < pattenMatchesLength; i++) {
        currentChunk = pattenMatches.shift();
        filteredString = filteredString.replace(
          VALUE_PLACEHOLDER, filter(currentChunk));
      }
    }

    return filteredString;
  }

  /*!
   * Check for floating point values within rgb strings and rounds them.
   *
   * @param {string} formattedString
   *
   * @return {string}
   */
  function sanitizeRGBChunks (formattedString) {
    return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
  }

  /*!
   * @param {string} rgbChunk
   *
   * @return {string}
   */
  function sanitizeRGBChunk (rgbChunk) {
    var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
    var numbersLength = numbers.length;
    var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];

    for (var i = 0; i < numbersLength; i++) {
      sanitizedString += parseInt(numbers[i], 10) + ',';
    }

    sanitizedString = sanitizedString.slice(0, -1) + ')';

    return sanitizedString;
  }

  /*!
   * @param {Object} stateObject
   *
   * @return {Object} An Object of formatManifests that correspond to
   * the string properties of stateObject
   */
  function getFormatManifests (stateObject) {
    var manifestAccumulator = {};

    Tweenable.each(stateObject, function (prop) {
      var currentProp = stateObject[prop];

      if (typeof currentProp === 'string') {
        var rawValues = getValuesFrom(currentProp);

        manifestAccumulator[prop] = {
          'formatString': getFormatStringFrom(currentProp)
          ,'chunkNames': getFormatChunksFrom(rawValues, prop)
        };
      }
    });

    return manifestAccumulator;
  }

  /*!
   * @param {Object} stateObject
   * @param {Object} formatManifests
   */
  function expandFormattedProperties (stateObject, formatManifests) {
    Tweenable.each(formatManifests, function (prop) {
      var currentProp = stateObject[prop];
      var rawValues = getValuesFrom(currentProp);
      var rawValuesLength = rawValues.length;

      for (var i = 0; i < rawValuesLength; i++) {
        stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
      }

      delete stateObject[prop];
    });
  }

  /*!
   * @param {Object} stateObject
   * @param {Object} formatManifests
   */
  function collapseFormattedProperties (stateObject, formatManifests) {
    Tweenable.each(formatManifests, function (prop) {
      var currentProp = stateObject[prop];
      var formatChunks = extractPropertyChunks(
        stateObject, formatManifests[prop].chunkNames);
      var valuesList = getValuesList(
        formatChunks, formatManifests[prop].chunkNames);
      currentProp = getFormattedValues(
        formatManifests[prop].formatString, valuesList);
      stateObject[prop] = sanitizeRGBChunks(currentProp);
    });
  }

  /*!
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Object} The extracted value chunks.
   */
  function extractPropertyChunks (stateObject, chunkNames) {
    var extractedValues = {};
    var currentChunkName, chunkNamesLength = chunkNames.length;

    for (var i = 0; i < chunkNamesLength; i++) {
      currentChunkName = chunkNames[i];
      extractedValues[currentChunkName] = stateObject[currentChunkName];
      delete stateObject[currentChunkName];
    }

    return extractedValues;
  }

  var getValuesList_accumulator = [];
  /*!
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Array.<number>}
   */
  function getValuesList (stateObject, chunkNames) {
    getValuesList_accumulator.length = 0;
    var chunkNamesLength = chunkNames.length;

    for (var i = 0; i < chunkNamesLength; i++) {
      getValuesList_accumulator.push(stateObject[chunkNames[i]]);
    }

    return getValuesList_accumulator;
  }

  /*!
   * @param {string} formatString
   * @param {Array.<number>} rawValues
   *
   * @return {string}
   */
  function getFormattedValues (formatString, rawValues) {
    var formattedValueString = formatString;
    var rawValuesLength = rawValues.length;

    for (var i = 0; i < rawValuesLength; i++) {
      formattedValueString = formattedValueString.replace(
        VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
    }

    return formattedValueString;
  }

  /*!
   * Note: It's the duty of the caller to convert the Array elements of the
   * return value into numbers.  This is a performance optimization.
   *
   * @param {string} formattedString
   *
   * @return {Array.<string>|null}
   */
  function getValuesFrom (formattedString) {
    return formattedString.match(R_UNFORMATTED_VALUES);
  }

  /*!
   * @param {Object} easingObject
   * @param {Object} tokenData
   */
  function expandEasingObject (easingObject, tokenData) {
    Tweenable.each(tokenData, function (prop) {
      var currentProp = tokenData[prop];
      var chunkNames = currentProp.chunkNames;
      var chunkLength = chunkNames.length;
      var easingChunks = easingObject[prop].split(' ');
      var lastEasingChunk = easingChunks[easingChunks.length - 1];

      for (var i = 0; i < chunkLength; i++) {
        easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
      }

      delete easingObject[prop];
    });
  }

  /*!
   * @param {Object} easingObject
   * @param {Object} tokenData
   */
  function collapseEasingObject (easingObject, tokenData) {
    Tweenable.each(tokenData, function (prop) {
      var currentProp = tokenData[prop];
      var chunkNames = currentProp.chunkNames;
      var chunkLength = chunkNames.length;
      var composedEasingString = '';

      for (var i = 0; i < chunkLength; i++) {
        composedEasingString += ' ' + easingObject[chunkNames[i]];
        delete easingObject[chunkNames[i]];
      }

      easingObject[prop] = composedEasingString.substr(1);
    });
  }

  Tweenable.prototype.filter.token = {
    'tweenCreated': function (currentState, fromState, toState, easingObject) {
      sanitizeObjectForHexProps(currentState);
      sanitizeObjectForHexProps(fromState);
      sanitizeObjectForHexProps(toState);
      this._tokenData = getFormatManifests(currentState);
    },

    'beforeTween': function (currentState, fromState, toState, easingObject) {
      expandEasingObject(easingObject, this._tokenData);
      expandFormattedProperties(currentState, this._tokenData);
      expandFormattedProperties(fromState, this._tokenData);
      expandFormattedProperties(toState, this._tokenData);
    },

    'afterTween': function (currentState, fromState, toState, easingObject) {
      collapseFormattedProperties(currentState, this._tokenData);
      collapseFormattedProperties(fromState, this._tokenData);
      collapseFormattedProperties(toState, this._tokenData);
      collapseEasingObject(easingObject, this._tokenData);
    }
  };

} (Tweenable));

}(this));

},{}],5:[function(require,module,exports){
// Circle shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');


var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
        ' a {radius},{radius} 0 1 1 0,{2radius}' +
        ' a {radius},{radius} 0 1 1 0,-{2radius}';

    Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }

    var r = 50 - widthOfWider / 2;

    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};

Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Circle;

},{"./shape":9,"./utils":11}],6:[function(require,module,exports){
// Line shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');


var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
    svg.setAttribute('preserveAspectRatio', 'none');
};

Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};

Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Line;

},{"./shape":9,"./utils":11}],7:[function(require,module,exports){
// Different shaped progress bars
var Line = require('./line');
var Circle = require('./circle');
var Square = require('./square');

// Lower level API to use any SVG path
var Path = require('./path');


module.exports = {
    Line: Line,
    Circle: Circle,
    Square: Square,
    Path: Path
};

},{"./circle":5,"./line":6,"./path":8,"./square":10}],8:[function(require,module,exports){
// Lower level API to animate any kind of svg path

var Tweenable = require('shifty');
var utils = require('./utils');

var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};


var Path = function Path(path, opts) {
    // Default parameters for animation
    opts = utils.extend({
        duration: 800,
        easing: 'linear',
        from: {},
        to: {},
        step: function() {}
    }, opts);

    var element;
    if (utils.isString(path)) {
        element = document.querySelector(path);
    } else {
        element = path;
    }

    // Reveal .path as public attribute
    this.path = element;
    this._opts = opts;
    this._tweenable = null;

    // Set up the starting positions
    var length = this.path.getTotalLength();
    this.path.style.strokeDasharray = length + ' ' + length;
    this.set(0);
};

Path.prototype.value = function value() {
    var offset = this._getComputedDashOffset();
    var length = this.path.getTotalLength();

    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(6), 10);
};

Path.prototype.set = function set(progress) {
    this.stop();

    this.path.style.strokeDashoffset = this._progressToOffset(progress);

    var step = this._opts.step;
    if (utils.isFunction(step)) {
        var easing = this._easing(this._opts.easing);
        var values = this._calculateTo(progress, easing);
        step(values, this._opts.shape||this, this._opts.attachment);
    }
};

Path.prototype.stop = function stop() {
    this._stopTween();
    this.path.style.strokeDashoffset = this._getComputedDashOffset();
};

// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};

    if (utils.isFunction(opts)) {
        cb = opts;
        opts = {};
    }

    var passedOpts = utils.extend({}, opts);

    // Copy default opts to new object so defaults are not modified
    var defaultOpts = utils.extend({}, this._opts);
    opts = utils.extend(defaultOpts, opts);

    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

    this.stop();

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this.path.getBoundingClientRect();

    var offset = this._getComputedDashOffset();
    var newOffset = this._progressToOffset(progress);

    var self = this;
    this._tweenable = new Tweenable();
    this._tweenable.tween({
        from: utils.extend({ offset: offset }, values.from),
        to: utils.extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        easing: shiftyEasing,
        step: function(state) {
            self.path.style.strokeDashoffset = state.offset;
            opts.step(state, opts.shape||self, opts.attachment);
        },
        finish: function(state) {
            if (utils.isFunction(cb)) {
                cb();
            }
        }
    });
};

Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
    var computedStyle = window.getComputedStyle(this.path, null);
    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};

Path.prototype._progressToOffset = function _progressToOffset(progress) {
    var length = this.path.getTotalLength();
    return length - progress * length;
};

// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }

    return {
        from: this._calculateFrom(easing),
        to: this._calculateTo(progress, easing)
    };
};

// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom = function _calculateFrom(easing) {
    return Tweenable.interpolate(this._opts.from, this._opts.to, this.value(), easing);
};

// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo = function _calculateTo(progress, easing) {
    return Tweenable.interpolate(this._opts.from, this._opts.to, progress, easing);
};

Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable.dispose();
        this._tweenable = null;
    }
};

Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }

    return easing;
};

module.exports = Path;

},{"./utils":11,"shifty":4}],9:[function(require,module,exports){
// Base object for different progress bar shapes

var Path = require('./path');
var utils = require('./utils');

var DESTROYED_ERROR = 'Object is destroyed';


var Shape = function Shape(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Shape)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Shape is inherited:
    //
    //   Line.prototype = new Shape();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) return;

    // Default parameters for progress bar creation
    this._opts = utils.extend({
        color: '#555',
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null,
        text: {
            autoStyle: true,
            color: null,
            value: '',
            className: 'progressbar-text'
        }
    }, opts, true);  // Use recursive extend

    var svgView = this._createSvgView(this._opts);

    var element;
    if (utils.isString(container)) {
        element = document.querySelector(container);
    } else {
        element = container;
    }

    if (!element) {
        throw new Error('Container does not exist: ' + container);
    }

    this._container = element;
    this._container.appendChild(svgView.svg);

    this.text = null;
    if (this._opts.text.value) {
        this.text = this._createTextElement(this._opts, this._container);
        this._container.appendChild(this.text);
    }

    // Expose public attributes before Path initialization
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
    // this.text is also a public attribute

    var newOpts = utils.extend({
        attachment: undefined,
        shape: this
    }, this._opts);
    this._progressPath = new Path(svgView.path, newOpts);
};

Shape.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    this._progressPath.animate(progress, opts, cb);
};

Shape.prototype.stop = function stop() {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    // Don't crash if stop is called inside step function
    if (this._progressPath === undefined) return;

    this._progressPath.stop();
};

Shape.prototype.destroy = function destroy() {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);

    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;

    if (this.text !== null) {
        this.text.parentNode.removeChild(this.text);
        this.text = null;
    }
};

Shape.prototype.set = function set(progress) {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    this._progressPath.set(progress);
};

Shape.prototype.value = function value() {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    if (this._progressPath === undefined) return 0;

    return this._progressPath.value();
};

Shape.prototype.setText = function setText(text) {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);

    if (this.text === null) {
        // Create new text node
        this.text = this._createTextElement(this._opts, this._container);
        this._container.appendChild(this.text);
    }

    // Remove previous text node and add new
    this.text.removeChild(this.text.firstChild);
    this.text.appendChild(document.createTextNode(text));
};

Shape.prototype._createSvgView = function _createSvgView(opts) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._initializeSvg(svg, opts);

    var trailPath = null;
    // Each option listed in the if condition are 'triggers' for creating
    // the trail path
    if (opts.trailColor || opts.trailWidth) {
        trailPath = this._createTrail(opts);
        svg.appendChild(trailPath);
    }

    var path = this._createPath(opts);
    svg.appendChild(path);

    return {
        svg: svg,
        path: path,
        trail: trailPath
    };
};

Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 100');
};

Shape.prototype._createPath = function _createPath(opts) {
    var pathString = this._pathString(opts);
    return this._createPathElement(pathString, opts);
};

Shape.prototype._createTrail = function _createTrail(opts) {
    // Create path string with original passed options
    var pathString = this._trailString(opts);

    // Prevent modifying original
    var newOpts = utils.extend({}, opts);

    // Defaults for parameters which modify trail path
    if (!newOpts.trailColor) newOpts.trailColor = '#eee';
    if (!newOpts.trailWidth) newOpts.trailWidth = newOpts.strokeWidth;

    newOpts.color = newOpts.trailColor;
    newOpts.strokeWidth = newOpts.trailWidth;

    // When trail path is set, fill must be set for it instead of the
    // actual path to prevent trail stroke from clipping
    newOpts.fill = null;

    return this._createPathElement(pathString, newOpts);
};

Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathString);
    path.setAttribute('stroke', opts.color);
    path.setAttribute('stroke-width', opts.strokeWidth);

    if (opts.fill) {
        path.setAttribute('fill', opts.fill);
    } else {
        path.setAttribute('fill-opacity', '0');
    }

    return path;
};

Shape.prototype._createTextElement = function _createTextElement(opts, container) {
    var element = document.createElement('p');
    element.appendChild(document.createTextNode(opts.text.value));

    if (opts.text.autoStyle) {
        // Center text
        container.style.position = 'relative';
        element.style.position = 'absolute';
        element.style.top = '50%';
        element.style.left = '50%';
        element.style.padding = 0;
        element.style.margin = 0;
        utils.setStyle(element, 'transform', 'translate(-50%, -50%)');

        if (opts.text.color) {
            element.style.color = opts.text.color;
        } else {
            element.style.color = opts.color;
        }
    }
    element.className = opts.text.className;

    return element;
};

Shape.prototype._pathString = function _pathString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._trailString = function _trailString(opts) {
    throw new Error('Override this function for each progress bar');
};

module.exports = Shape;

},{"./path":8,"./utils":11}],10:[function(require,module,exports){
// Square shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');


var Square = function Square(container, options) {
    this._pathTemplate =
        'M 0,{halfOfStrokeWidth}' +
        ' L {width},{halfOfStrokeWidth}' +
        ' L {width},{width}' +
        ' L {halfOfStrokeWidth},{width}' +
        ' L {halfOfStrokeWidth},{strokeWidth}';

    this._trailTemplate =
        'M {startMargin},{halfOfStrokeWidth}' +
        ' L {width},{halfOfStrokeWidth}' +
        ' L {width},{width}' +
        ' L {halfOfStrokeWidth},{width}' +
        ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';

    Shape.apply(this, arguments);
};

Square.prototype = new Shape();
Square.prototype.constructor = Square;

Square.prototype._pathString = function _pathString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._pathTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2
    });
};

Square.prototype._trailString = function _trailString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._trailTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2,
        startMargin: (opts.strokeWidth / 2) - (opts.trailWidth / 2)
    });
};

module.exports = Square;

},{"./shape":9,"./utils":11}],11:[function(require,module,exports){
// Utility functions

var PREFIXES = 'Webkit Moz O ms'.split(' ');

// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source, recursive) {
    destination = destination || {};
    source = source || {};
    recursive = recursive || false;

    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            var destVal = destination[attrName];
            var sourceVal = source[attrName];
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[attrName] = extend(destVal, sourceVal, recursive);
            } else {
                destination[attrName] = sourceVal;
            }
        }
    }

    return destination;
}

// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
    var rendered = template;

    for (var key in vars) {
        if (vars.hasOwnProperty(key)) {
            var val = vars[key];
            var regExpString = '\\{' + key + '\\}';
            var regExp = new RegExp(regExpString, 'g');

            rendered = rendered.replace(regExp, val);
        }
    }

    return rendered;
}

function setStyle(element, style, value) {
    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        element.style[prefix + capitalize(style)] = value;
    }

    element.style[style] = value;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj) {
    if (isArray(obj)) return false;

    var type = typeof obj;
    return type === 'object' && !!obj;
}


module.exports = {
    extend: extend,
    render: render,
    setStyle: setStyle,
    capitalize: capitalize,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject
};

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9HaXQvTWVyaWRpdW0uQ2hhbGxlbmdlQm9hcmQvQ2hhbGxlbmdlQm9hcmQuV2ViL0NvbnRlbnQvU2NyaXB0cy9Nb2R1bGVzL0NoYWxsZW5nZUNhcmRzLmpzIiwiQzovR2l0L01lcmlkaXVtLkNoYWxsZW5nZUJvYXJkL0NoYWxsZW5nZUJvYXJkLldlYi9Db250ZW50L1NjcmlwdHMvTW9kdWxlcy9Vc2VySW5mby5qcyIsIkM6L0dpdC9NZXJpZGl1bS5DaGFsbGVuZ2VCb2FyZC9DaGFsbGVuZ2VCb2FyZC5XZWIvQ29udGVudC9TY3JpcHRzL21haW4uanMiLCIuLi9DaGFsbGVuZ2VCb2FyZC5XZWIvQ29udGVudC9TY3JpcHRzL25vZGVfbW9kdWxlcy9wcm9ncmVzc2Jhci5qcy9ub2RlX21vZHVsZXMvc2hpZnR5L2Rpc3Qvc2hpZnR5LmpzIiwiLi4vQ2hhbGxlbmdlQm9hcmQuV2ViL0NvbnRlbnQvU2NyaXB0cy9ub2RlX21vZHVsZXMvcHJvZ3Jlc3NiYXIuanMvc3JjL2NpcmNsZS5qcyIsIi4uL0NoYWxsZW5nZUJvYXJkLldlYi9Db250ZW50L1NjcmlwdHMvbm9kZV9tb2R1bGVzL3Byb2dyZXNzYmFyLmpzL3NyYy9saW5lLmpzIiwiLi4vQ2hhbGxlbmdlQm9hcmQuV2ViL0NvbnRlbnQvU2NyaXB0cy9ub2RlX21vZHVsZXMvcHJvZ3Jlc3NiYXIuanMvc3JjL21haW4uanMiLCIuLi9DaGFsbGVuZ2VCb2FyZC5XZWIvQ29udGVudC9TY3JpcHRzL25vZGVfbW9kdWxlcy9wcm9ncmVzc2Jhci5qcy9zcmMvcGF0aC5qcyIsIi4uL0NoYWxsZW5nZUJvYXJkLldlYi9Db250ZW50L1NjcmlwdHMvbm9kZV9tb2R1bGVzL3Byb2dyZXNzYmFyLmpzL3NyYy9zaGFwZS5qcyIsIi4uL0NoYWxsZW5nZUJvYXJkLldlYi9Db250ZW50L1NjcmlwdHMvbm9kZV9tb2R1bGVzL3Byb2dyZXNzYmFyLmpzL3NyYy9zcXVhcmUuanMiLCIuLi9DaGFsbGVuZ2VCb2FyZC5XZWIvQ29udGVudC9TY3JpcHRzL25vZGVfbW9kdWxlcy9wcm9ncmVzc2Jhci5qcy9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxjQUFjO0FBQ0wsYUFEVCxjQUFjLENBQ0osSUFBSSxFQUFFOzhCQURoQixjQUFjOztBQUVaLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzdCOztpQkFKQyxjQUFjOztlQUtFLDhCQUFHO0FBQ2pCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsZ0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMscUJBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDM0MscUJBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQix3QkFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLHdCQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RDLENBQUMsQ0FBQzthQUNOO1NBQ0o7OztlQUNrQiw2QkFBQyxJQUFJLEVBQUU7QUFDdEIsZ0JBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUN0RSxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN4QyxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5QyxnQkFBRyxzQkFBc0IsRUFBRTtBQUN2QixzQkFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN4Qjs7QUFHRCxnQkFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUN4RSxvQkFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQzs7O2VBQ3NCLGlDQUFDLElBQUksRUFBRTtBQUMxQixnQkFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUMvQixlQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3pDLGVBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUN6RCxlQUFHLENBQUMsTUFBTSxHQUFHLFlBQVk7QUFDckIsb0JBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7OztBQUdwQix3QkFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDOUQsMEJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHVCQUF1QixHQUFHLFFBQVEsQ0FBQztBQUMxRCwyQkFBTztpQkFDVjthQUNKLENBQUM7QUFDRixlQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDcEIsa0JBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztBQUNoQywyQkFBVyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ1A7OztXQTdDQyxjQUFjOzs7QUErQ3BCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDOzs7Ozs7Ozs7QUMvQ2hDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztJQUV0QyxRQUFRO0FBQ0MsYUFEVCxRQUFRLENBQ0UsSUFBSSxFQUFFOzhCQURoQixRQUFROztBQUVOLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFO0FBQy9ELGlCQUFLLEVBQUUsU0FBUztBQUNoQix1QkFBVyxFQUFFLENBQUM7QUFDZCxrQkFBTSxFQUFFLFdBQVc7U0FDdEIsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3pCOztpQkFUQyxRQUFROztlQVVJLDBCQUFHOzs7QUFDYixvQkFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLFVBQUEsS0FBSzt1QkFBSSxNQUFLLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7U0FDbEc7OztlQUNjLDJCQUNmO0FBQ0ksZ0JBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pGLGdCQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRSxnQkFBSSxRQUFRLEdBQUcsYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUN4QyxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FHdEM7OztlQUNnQiwyQkFBQyxNQUFNLEVBQUU7QUFDdEIsbUJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsZ0JBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEQsZ0JBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELGdCQUFJLFFBQVEsR0FBRyxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELHNCQUFVLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUNoQyxnQkFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzRyxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7OztBQUduQyxnQkFBSSxRQUFRLElBQUksR0FBRyxFQUFFOztBQUVqQixvQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDeEMseUJBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNwQzthQUNKLE1BQU07O0FBRUgsb0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN2RCxvQkFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN2Qyx5QkFBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7QUFDRCxnQkFBSSxhQUFhLElBQUksR0FBRyxFQUFFOztBQUV0QixvQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDeEMseUJBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNwQzthQUNKLE1BQU07O0FBRUgsb0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN2RCxvQkFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN2Qyx5QkFBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7O0FBRUQsZ0JBQUksYUFBYSxJQUFJLEdBQUcsRUFBRTtBQUN0QixvQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pELG9CQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDeEMseUJBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNwQzthQUNKLE1BQU07QUFDSCxvQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pELG9CQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ3ZDLHlCQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDdkM7YUFDSjtBQUNELGdCQUFJLGFBQWEsSUFBSSxHQUFHLEVBQUU7QUFDdEIsb0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4RCxvQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ3hDLHlCQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDcEM7YUFDSixNQUFNO0FBQ0gsb0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4RCxvQkFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN2Qyx5QkFBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7QUFDRCxnQkFBSSxhQUFhLElBQUksSUFBSSxFQUFFO0FBQ3ZCLG9CQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEQsb0JBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN4Qyx5QkFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0osTUFBTTtBQUNILG9CQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEQsb0JBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDdkMseUJBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN2QzthQUNKO1NBRUo7OztXQTlGQyxRQUFROzs7QUFnR2QsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7Ozs7Ozs7cUNDbEdDLDBCQUEwQjs7OzsrQkFDaEMsb0JBQW9COzs7O0FBRXpDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFTLEtBQUssRUFBRTtBQUMxRCxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7QUFFOUQsUUFBSSxjQUFjLEdBQUcsdUNBQW1CLFFBQVEsQ0FBQyxDQUFDO0FBQ2xELFFBQUksUUFBUSxHQUFHLGlDQUFhLFFBQVEsQ0FBQyxDQUFDOztBQUV0QyxZQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7O0FBRTNCLFFBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDaEQsQ0FBQyxDQUFDOzs7Ozs7O0FDWkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2gyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQ2hhbGxlbmdlQ2FyZHMge1xyXG4gICAgY29uc3RydWN0b3IodXNlcikge1xyXG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckNsaWNrRXZlbnQoKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyQ2xpY2tFdmVudCgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhcmRcIik7ICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhcmRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hhbGxlbmdlQ2FyZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hhbGxlbmdlT25TZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZUNoYWxsZW5nZUNhcmQoY2FyZCkge1xyXG4gICAgICAgIHZhciBjYXJkSXNNYXJrZWRBc0NvbXBsZXRlID0gY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkLS1jb21wbGV0ZVwiKVxyXG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmQtLWNvbXBsZXRlXCIpO1xyXG4gICAgICAgIHZhciBwb2ludHMgPSBjYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1wb2ludHMnKTtcclxuICAgICAgICBpZihjYXJkSXNNYXJrZWRBc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHBvaW50cyA9IHBvaW50cyAqIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbGxlbmdlQ2FyZFNhdmVkXCIsIHsgXCJkZXRhaWxcIjogcG9pbnRzIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ2hhbGxlbmdlT25TZXJ2ZXIoY2FyZCkgeyAgICAgICAgXHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgJ0hvbWUvVG9nZ2xlQ2hhbGxlbmdlJyk7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgLy9Tb21ldGhpbmcgd2VudCB3cm9uZyBtZXNzYWdlLlxyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRvIGxvZ2luIGZvcm1cclxuICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlci1oaWRlXCIpLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvQXV0aGVudGljYXRpb24/bmFtZT1cIiArIHVzZXJuYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGlkOiBjYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICBjdXJyZW50VXNlcjogdGhpcy51c2VyXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gQ2hhbGxlbmdlQ2FyZHM7IiwidmFyIHByb2dyZXNzYmFyID0gcmVxdWlyZSgncHJvZ3Jlc3NiYXIuanMnKTtcclxuXHJcbmNsYXNzIFVzZXJJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKHVzZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIgPSBuZXcgcHJvZ3Jlc3NiYXIuQ2lyY2xlKCcjUHJvZ3Jlc3NCYXJDb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwY2M5OScsXHJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAzLFxyXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYWxsZW5nZUNhcmRTYXZlZFwiLCBldmVudCA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKGV2ZW50LmRldGFpbCkpO1xyXG4gICAgfVxyXG4gICAgaW5pdFByb2dyZXNzQmFyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgY3VycmVudFBvaW50cyA9IHBhcnNlRmxvYXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvLXNjb3JlJykuaW5uZXJUZXh0KTtcclxuICAgICAgICB2YXIgbWF4U2NvcmUgPSBwYXJzZUZsb2F0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXgtc2NvcmUnKS5pbm5lclRleHQpO1xyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IGN1cnJlbnRQb2ludHMgLyBtYXhTY29yZTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLmFuaW1hdGUocHJvZ3Jlc3MpO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHVwZGF0ZVByb2dyZXNzQmFyKHBvaW50cykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaW50cyk7XHJcbiAgICAgICAgdmFyIHNjb3JlYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8tc2NvcmUnKTtcclxuICAgICAgICB2YXIgY3VycmVudFBvaW50cyA9IHBhcnNlSW50KHNjb3JlYm9hcmQuaW5uZXJUZXh0KTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbmV3U2NvcmUgPSBjdXJyZW50UG9pbnRzICsgcGFyc2VJbnQocG9pbnRzKTtcclxuICAgICAgICBzY29yZWJvYXJkLmlubmVyVGV4dCA9IG5ld1Njb3JlO1xyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IHBhcnNlRmxvYXQoc2NvcmVib2FyZC5pbm5lclRleHQpL3BhcnNlRmxvYXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heC1zY29yZScpLmlubmVyVGV4dCk7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5hbmltYXRlKHByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgYm9udXMgcmluZ3NcclxuICAgICAgICBpZiAobmV3U2NvcmUgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9udXMtbGV2ZWwtb25lJyk7XHJcbiAgICAgICAgICAgIGlmICghbGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnVsZmlsbGVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5jbGFzc0xpc3QuYWRkKFwiZnVsZmlsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib251cy1sZXZlbC1vbmUnKTtcclxuICAgICAgICAgICAgaWYgKGxldmVsLmNsYXNzTGlzdC5jb250YWlucyhcImZ1bGZpbGxlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuY2xhc3NMaXN0LnJlbW92ZShcImZ1bGZpbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBvaW50cyA+PSAzNTApIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIjEwMCBlbGxlciBtZXJcIik7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib251cy1sZXZlbC10d28nKTtcclxuICAgICAgICAgICAgaWYgKCFsZXZlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmdWxmaWxsZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldmVsLmNsYXNzTGlzdC5hZGQoXCJmdWxmaWxsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwibWluZHJlIO+/vW4gMTAwXCIpO1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9udXMtbGV2ZWwtdHdvJyk7XHJcbiAgICAgICAgICAgIGlmIChsZXZlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmdWxmaWxsZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmdWxmaWxsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZiAoY3VycmVudFBvaW50cyA+PSA1MDApIHtcclxuICAgICAgICAgICAgdmFyIGxldmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbnVzLWxldmVsLXRocmVlJyk7XHJcbiAgICAgICAgICAgIGlmICghbGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnVsZmlsbGVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5jbGFzc0xpc3QuYWRkKFwiZnVsZmlsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxldmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbnVzLWxldmVsLXRocmVlJyk7XHJcbiAgICAgICAgICAgIGlmIChsZXZlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmdWxmaWxsZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmdWxmaWxsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQb2ludHMgPj0gNzUwKSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib251cy1sZXZlbC1mb3VyJyk7XHJcbiAgICAgICAgICAgIGlmICghbGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnVsZmlsbGVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5jbGFzc0xpc3QuYWRkKFwiZnVsZmlsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxldmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbnVzLWxldmVsLWZvdXInKTtcclxuICAgICAgICAgICAgaWYgKGxldmVsLmNsYXNzTGlzdC5jb250YWlucyhcImZ1bGZpbGxlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuY2xhc3NMaXN0LnJlbW92ZShcImZ1bGZpbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBvaW50cyA+PSAxMDAwKSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib251cy1sZXZlbC1maXZlJyk7XHJcbiAgICAgICAgICAgIGlmICghbGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnVsZmlsbGVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5jbGFzc0xpc3QuYWRkKFwiZnVsZmlsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxldmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbnVzLWxldmVsLWZpdmUnKTtcclxuICAgICAgICAgICAgaWYgKGxldmVsLmNsYXNzTGlzdC5jb250YWlucyhcImZ1bGZpbGxlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuY2xhc3NMaXN0LnJlbW92ZShcImZ1bGZpbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VySW5mbzsiLCJpbXBvcnQgQ2hhbGxlbmdlQ2FyZHMgZnJvbSBcIi4vTW9kdWxlcy9DaGFsbGVuZ2VDYXJkc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4vTW9kdWxlcy9Vc2VySW5mb1wiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlci1oaWRlXCIpLmlubmVyVGV4dDtcclxuICAgIFxyXG4gICAgdmFyIGNoYWxsZW5nZUNhcmRzID0gbmV3IENoYWxsZW5nZUNhcmRzKHVzZXJuYW1lKTtcclxuICAgIHZhciB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh1c2VybmFtZSk7XHJcblxyXG4gICAgdXNlckluZm8uaW5pdFByb2dyZXNzQmFyKCk7XHJcblxyXG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NhcmRzJyk7XHJcbn0pO1xyXG4vKnZhciBtc25yeSA9IG5ldyBNYXNvbnJ5KCBjYXJkcywge1xyXG4gIGl0ZW1TZWxlY3RvcjogJy5pdGVtJyxcclxuICBjb2x1bW5XaWR0aDogMjIwXHJcbn0pOyovIiwiLyohIHNoaWZ0eSAtIHYxLjIuMiAtIDIwMTQtMTAtMDkgLSBodHRwOi8vamVyZW15Y2thaG4uZ2l0aHViLmlvL3NoaWZ0eSAqL1xyXG47KGZ1bmN0aW9uIChyb290KSB7XHJcblxyXG4vKiFcclxuICogU2hpZnR5IENvcmVcclxuICogQnkgSmVyZW15IEthaG4gLSBqZXJlbXlja2FobkBnbWFpbC5jb21cclxuICovXHJcblxyXG4vLyBVZ2xpZnlKUyBkZWZpbmUgaGFjay4gIFVzZWQgZm9yIHVuaXQgdGVzdGluZy4gIENvbnRlbnRzIG9mIHRoaXMgaWYgYXJlXHJcbi8vIGNvbXBpbGVkIGF3YXkuXHJcbmlmICh0eXBlb2YgU0hJRlRZX0RFQlVHX05PVyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICBTSElGVFlfREVCVUdfTk9XID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICtuZXcgRGF0ZSgpO1xyXG4gIH07XHJcbn1cclxuXHJcbnZhciBUd2VlbmFibGUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vIEFsaWFzZXMgdGhhdCBnZXQgZGVmaW5lZCBsYXRlciBpbiB0aGlzIGZ1bmN0aW9uXHJcbiAgdmFyIGZvcm11bGE7XHJcblxyXG4gIC8vIENPTlNUQU5UU1xyXG4gIHZhciBERUZBVUxUX1NDSEVEVUxFX0ZVTkNUSU9OO1xyXG4gIHZhciBERUZBVUxUX0VBU0lORyA9ICdsaW5lYXInO1xyXG4gIHZhciBERUZBVUxUX0RVUkFUSU9OID0gNTAwO1xyXG4gIHZhciBVUERBVEVfVElNRSA9IDEwMDAgLyA2MDtcclxuXHJcbiAgdmFyIF9ub3cgPSBEYXRlLm5vd1xyXG4gICAgICAgPyBEYXRlLm5vd1xyXG4gICAgICAgOiBmdW5jdGlvbiAoKSB7cmV0dXJuICtuZXcgRGF0ZSgpO307XHJcblxyXG4gIHZhciBub3cgPSBTSElGVFlfREVCVUdfTk9XXHJcbiAgICAgICA/IFNISUZUWV9ERUJVR19OT1dcclxuICAgICAgIDogX25vdztcclxuXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSBzaGltIGJ5IFBhdWwgSXJpc2ggKG1vZGlmaWVkIGZvciBTaGlmdHkpXHJcbiAgICAvLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG4gICAgREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgICAgIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbiAgICAgICB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgICAgIHx8ICh3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbiAgICAgICAmJiB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgICAgfHwgc2V0VGltZW91dDtcclxuICB9IGVsc2Uge1xyXG4gICAgREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTiA9IHNldFRpbWVvdXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBub29wICgpIHtcclxuICAgIC8vIE5PT1AhXHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBIYW5keSBzaG9ydGN1dCBmb3IgZG9pbmcgYSBmb3ItaW4gbG9vcC4gVGhpcyBpcyBub3QgYSBcIm5vcm1hbFwiIGVhY2hcclxuICAgKiBmdW5jdGlvbiwgaXQgaXMgb3B0aW1pemVkIGZvciBTaGlmdHkuICBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gb25seSByZWNlaXZlc1xyXG4gICAqIHRoZSBwcm9wZXJ0eSBuYW1lLCBub3QgdGhlIHZhbHVlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uKHN0cmluZyl9IGZuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZWFjaCAob2JqLCBmbikge1xyXG4gICAgdmFyIGtleTtcclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XHJcbiAgICAgICAgZm4oa2V5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogUGVyZm9ybSBhIHNoYWxsb3cgY29weSBvZiBPYmplY3QgcHJvcGVydGllcy5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0T2JqZWN0IFRoZSBvYmplY3QgdG8gY29weSBpbnRvXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNyY09iamVjdCBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxyXG4gICAqIEByZXR1cm4ge09iamVjdH0gQSByZWZlcmVuY2UgdG8gdGhlIGF1Z21lbnRlZCBgdGFyZ2V0T2JqYCBPYmplY3RcclxuICAgKi9cclxuICBmdW5jdGlvbiBzaGFsbG93Q29weSAodGFyZ2V0T2JqLCBzcmNPYmopIHtcclxuICAgIGVhY2goc3JjT2JqLCBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICB0YXJnZXRPYmpbcHJvcF0gPSBzcmNPYmpbcHJvcF07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0T2JqO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQ29waWVzIGVhY2ggcHJvcGVydHkgZnJvbSBzcmMgb250byB0YXJnZXQsIGJ1dCBvbmx5IGlmIHRoZSBwcm9wZXJ0eSB0b1xyXG4gICAqIGNvcHkgdG8gdGFyZ2V0IGlzIHVuZGVmaW5lZC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IE1pc3NpbmcgcHJvcGVydGllcyBpbiB0aGlzIE9iamVjdCBhcmUgZmlsbGVkIGluXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNyY1xyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGRlZmF1bHRzICh0YXJnZXQsIHNyYykge1xyXG4gICAgZWFjaChzcmMsIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRhcmdldFtwcm9wXSA9IHNyY1twcm9wXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBDYWxjdWxhdGVzIHRoZSBpbnRlcnBvbGF0ZWQgdHdlZW4gdmFsdWVzIG9mIGFuIE9iamVjdCBmb3IgYSBnaXZlblxyXG4gICAqIHRpbWVzdGFtcC5cclxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yUG9zaXRpb24gVGhlIHBvc2l0aW9uIHRvIGNvbXB1dGUgdGhlIHN0YXRlIGZvci5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gY3VycmVudFN0YXRlIEN1cnJlbnQgc3RhdGUgcHJvcGVydGllcy5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3JpZ2luYWxTdGF0ZTogVGhlIG9yaWdpbmFsIHN0YXRlIHByb3BlcnRpZXMgdGhlIE9iamVjdCBpc1xyXG4gICAqIHR3ZWVuaW5nIGZyb20uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFN0YXRlOiBUaGUgZGVzdGluYXRpb24gc3RhdGUgcHJvcGVydGllcyB0aGUgT2JqZWN0XHJcbiAgICogaXMgdHdlZW5pbmcgdG8uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uOiBUaGUgbGVuZ3RoIG9mIHRoZSB0d2VlbiBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcDogVGhlIFVOSVggZXBvY2ggdGltZSBhdCB3aGljaCB0aGUgdHdlZW4gYmVnYW4uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZzogVGhpcyBPYmplY3QncyBrZXlzIG11c3QgY29ycmVzcG9uZCB0byB0aGUga2V5cyBpblxyXG4gICAqIHRhcmdldFN0YXRlLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHR3ZWVuUHJvcHMgKGZvclBvc2l0aW9uLCBjdXJyZW50U3RhdGUsIG9yaWdpbmFsU3RhdGUsIHRhcmdldFN0YXRlLFxyXG4gICAgZHVyYXRpb24sIHRpbWVzdGFtcCwgZWFzaW5nKSB7XHJcbiAgICB2YXIgbm9ybWFsaXplZFBvc2l0aW9uID0gKGZvclBvc2l0aW9uIC0gdGltZXN0YW1wKSAvIGR1cmF0aW9uO1xyXG5cclxuICAgIHZhciBwcm9wO1xyXG4gICAgZm9yIChwcm9wIGluIGN1cnJlbnRTdGF0ZSkge1xyXG4gICAgICBpZiAoY3VycmVudFN0YXRlLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgY3VycmVudFN0YXRlW3Byb3BdID0gdHdlZW5Qcm9wKG9yaWdpbmFsU3RhdGVbcHJvcF0sXHJcbiAgICAgICAgICB0YXJnZXRTdGF0ZVtwcm9wXSwgZm9ybXVsYVtlYXNpbmdbcHJvcF1dLCBub3JtYWxpemVkUG9zaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcclxuICB9XHJcblxyXG4gIC8qIVxyXG4gICAqIFR3ZWVucyBhIHNpbmdsZSBwcm9wZXJ0eS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHZhbHVlIHRoYXQgdGhlIHR3ZWVuIHN0YXJ0ZWQgZnJvbS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZW5kIFRoZSB2YWx1ZSB0aGF0IHRoZSB0d2VlbiBzaG91bGQgZW5kIGF0LlxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGVhc2luZ0Z1bmMgVGhlIGVhc2luZyBjdXJ2ZSB0byBhcHBseSB0byB0aGUgdHdlZW4uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uIFRoZSBub3JtYWxpemVkIHBvc2l0aW9uIChiZXR3ZWVuIDAuMCBhbmQgMS4wKSB0b1xyXG4gICAqIGNhbGN1bGF0ZSB0aGUgbWlkcG9pbnQgb2YgJ3N0YXJ0JyBhbmQgJ2VuZCcgYWdhaW5zdC5cclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB0d2VlbmVkIHZhbHVlLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHR3ZWVuUHJvcCAoc3RhcnQsIGVuZCwgZWFzaW5nRnVuYywgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiBzdGFydCArIChlbmQgLSBzdGFydCkgKiBlYXNpbmdGdW5jKHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qIVxyXG4gICAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gVHdlZW5hYmxlIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7VHdlZW5hYmxlfSB0d2VlbmFibGUgVGhlIGBUd2VlbmFibGVgIGluc3RhbmNlIHRvIGNhbGwgdGhlIGZpbHRlclxyXG4gICAqIHVwb24uXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlck5hbWUgVGhlIG5hbWUgb2YgdGhlIGZpbHRlciB0byBhcHBseS5cclxuICAgKi9cclxuICBmdW5jdGlvbiBhcHBseUZpbHRlciAodHdlZW5hYmxlLCBmaWx0ZXJOYW1lKSB7XHJcbiAgICB2YXIgZmlsdGVycyA9IFR3ZWVuYWJsZS5wcm90b3R5cGUuZmlsdGVyO1xyXG4gICAgdmFyIGFyZ3MgPSB0d2VlbmFibGUuX2ZpbHRlckFyZ3M7XHJcblxyXG4gICAgZWFjaChmaWx0ZXJzLCBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICBpZiAodHlwZW9mIGZpbHRlcnNbbmFtZV1bZmlsdGVyTmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgZmlsdGVyc1tuYW1lXVtmaWx0ZXJOYW1lXS5hcHBseSh0d2VlbmFibGUsIGFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHZhciB0aW1lb3V0SGFuZGxlcl9lbmRUaW1lO1xyXG4gIHZhciB0aW1lb3V0SGFuZGxlcl9jdXJyZW50VGltZTtcclxuICB2YXIgdGltZW91dEhhbmRsZXJfaXNFbmRlZDtcclxuICAvKiFcclxuICAgKiBIYW5kbGVzIHRoZSB1cGRhdGUgbG9naWMgZm9yIG9uZSBzdGVwIG9mIGEgdHdlZW4uXHJcbiAgICogQHBhcmFtIHtUd2VlbmFibGV9IHR3ZWVuYWJsZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gY3VycmVudFN0YXRlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsU3RhdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0U3RhdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3RlcFxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb24oRnVuY3Rpb24sbnVtYmVyKX19IHNjaGVkdWxlXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdGltZW91dEhhbmRsZXIgKHR3ZWVuYWJsZSwgdGltZXN0YW1wLCBkdXJhdGlvbiwgY3VycmVudFN0YXRlLFxyXG4gICAgb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsIGVhc2luZywgc3RlcCwgc2NoZWR1bGUpIHtcclxuICAgIHRpbWVvdXRIYW5kbGVyX2VuZFRpbWUgPSB0aW1lc3RhbXAgKyBkdXJhdGlvbjtcclxuICAgIHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lID0gTWF0aC5taW4obm93KCksIHRpbWVvdXRIYW5kbGVyX2VuZFRpbWUpO1xyXG4gICAgdGltZW91dEhhbmRsZXJfaXNFbmRlZCA9IHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lID49IHRpbWVvdXRIYW5kbGVyX2VuZFRpbWU7XHJcblxyXG4gICAgaWYgKHR3ZWVuYWJsZS5pc1BsYXlpbmcoKSAmJiAhdGltZW91dEhhbmRsZXJfaXNFbmRlZCkge1xyXG4gICAgICBzY2hlZHVsZSh0d2VlbmFibGUuX3RpbWVvdXRIYW5kbGVyLCBVUERBVEVfVElNRSk7XHJcblxyXG4gICAgICBhcHBseUZpbHRlcih0d2VlbmFibGUsICdiZWZvcmVUd2VlbicpO1xyXG4gICAgICB0d2VlblByb3BzKHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lLCBjdXJyZW50U3RhdGUsIG9yaWdpbmFsU3RhdGUsXHJcbiAgICAgICAgdGFyZ2V0U3RhdGUsIGR1cmF0aW9uLCB0aW1lc3RhbXAsIGVhc2luZyk7XHJcbiAgICAgIGFwcGx5RmlsdGVyKHR3ZWVuYWJsZSwgJ2FmdGVyVHdlZW4nKTtcclxuXHJcbiAgICAgIHN0ZXAoY3VycmVudFN0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAodGltZW91dEhhbmRsZXJfaXNFbmRlZCkge1xyXG4gICAgICBzdGVwKHRhcmdldFN0YXRlKTtcclxuICAgICAgdHdlZW5hYmxlLnN0b3AodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyohXHJcbiAgICogQ3JlYXRlcyBhIHVzYWJsZSBlYXNpbmcgT2JqZWN0IGZyb20gZWl0aGVyIGEgc3RyaW5nIG9yIGFub3RoZXIgZWFzaW5nXHJcbiAgICogT2JqZWN0LiAgSWYgYGVhc2luZ2AgaXMgYW4gT2JqZWN0LCB0aGVuIHRoaXMgZnVuY3Rpb24gY2xvbmVzIGl0IGFuZCBmaWxsc1xyXG4gICAqIGluIHRoZSBtaXNzaW5nIHByb3BlcnRpZXMgd2l0aCBcImxpbmVhclwiLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tVHdlZW5QYXJhbXNcclxuICAgKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IGVhc2luZ1xyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNvbXBvc2VFYXNpbmdPYmplY3QgKGZyb21Ud2VlblBhcmFtcywgZWFzaW5nKSB7XHJcbiAgICB2YXIgY29tcG9zZWRFYXNpbmcgPSB7fTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGVhc2luZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZWFjaChmcm9tVHdlZW5QYXJhbXMsIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgY29tcG9zZWRFYXNpbmdbcHJvcF0gPSBlYXNpbmc7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWFjaChmcm9tVHdlZW5QYXJhbXMsIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgaWYgKCFjb21wb3NlZEVhc2luZ1twcm9wXSkge1xyXG4gICAgICAgICAgY29tcG9zZWRFYXNpbmdbcHJvcF0gPSBlYXNpbmdbcHJvcF0gfHwgREVGQVVMVF9FQVNJTkc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29tcG9zZWRFYXNpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUd2VlbmFibGUgY29uc3RydWN0b3IuXHJcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfaW5pdGlhbFN0YXRlIFRoZSB2YWx1ZXMgdGhhdCB0aGUgaW5pdGlhbCB0d2VlbiBzaG91bGQgc3RhcnQgYXQgaWYgYSBcImZyb21cIiBvYmplY3QgaXMgbm90IHByb3ZpZGVkIHRvIFR3ZWVuYWJsZSN0d2Vlbi5cclxuICAgKiBAcGFyYW0ge09iamVjdD19IG9wdF9jb25maWcgU2VlIFR3ZWVuYWJsZS5wcm90b3R5cGUuc2V0Q29uZmlnKClcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBmdW5jdGlvbiBUd2VlbmFibGUgKG9wdF9pbml0aWFsU3RhdGUsIG9wdF9jb25maWcpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG9wdF9pbml0aWFsU3RhdGUgfHwge307XHJcbiAgICB0aGlzLl9jb25maWd1cmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9zY2hlZHVsZUZ1bmN0aW9uID0gREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTjtcclxuXHJcbiAgICAvLyBUbyBwcmV2ZW50IHVubmVjZXNzYXJ5IGNhbGxzIHRvIHNldENvbmZpZyBkbyBub3Qgc2V0IGRlZmF1bHQgY29uZmlndXJhdGlvbiBoZXJlLlxyXG4gICAgLy8gT25seSBzZXQgZGVmYXVsdCBjb25maWd1cmF0aW9uIGltbWVkaWF0ZWx5IGJlZm9yZSB0d2VlbmluZyBpZiBub25lIGhhcyBiZWVuIHNldC5cclxuICAgIGlmICh0eXBlb2Ygb3B0X2NvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5zZXRDb25maWcob3B0X2NvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb25maWd1cmUgYW5kIHN0YXJ0IGEgdHdlZW4uXHJcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfY29uZmlnIFNlZSBUd2VlbmFibGUucHJvdG90eXBlLnNldENvbmZpZygpXHJcbiAgICogQHJldHVybiB7VHdlZW5hYmxlfVxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUudHdlZW4gPSBmdW5jdGlvbiAob3B0X2NvbmZpZykge1xyXG4gICAgaWYgKHRoaXMuX2lzVHdlZW5pbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT25seSBzZXQgZGVmYXVsdCBjb25maWcgaWYgbm8gY29uZmlndXJhdGlvbiBoYXMgYmVlbiBzZXQgcHJldmlvdXNseSBhbmQgbm9uZSBpcyBwcm92aWRlZCBub3cuXHJcbiAgICBpZiAob3B0X2NvbmZpZyAhPT0gdW5kZWZpbmVkIHx8ICF0aGlzLl9jb25maWd1cmVkKSB7XHJcbiAgICAgIHRoaXMuc2V0Q29uZmlnKG9wdF9jb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3N0YXJ0KHRoaXMuZ2V0KCkpO1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdW1lKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdHdlZW4gY29uZmlndXJhdGlvbi4gYGNvbmZpZ2AgbWF5IGhhdmUgdGhlIGZvbGxvd2luZyBvcHRpb25zOlxyXG4gICAqXHJcbiAgICogLSBfX2Zyb21fXyAoX09iamVjdD1fKTogU3RhcnRpbmcgcG9zaXRpb24uICBJZiBvbWl0dGVkLCB0aGUgY3VycmVudCBzdGF0ZSBpcyB1c2VkLlxyXG4gICAqIC0gX190b19fIChfT2JqZWN0PV8pOiBFbmRpbmcgcG9zaXRpb24uXHJcbiAgICogLSBfX2R1cmF0aW9uX18gKF9udW1iZXI9Xyk6IEhvdyBtYW55IG1pbGxpc2Vjb25kcyB0byBhbmltYXRlIGZvci5cclxuICAgKiAtIF9fc3RhcnRfXyAoX0Z1bmN0aW9uKE9iamVjdCk9Xyk6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgdHdlZW4gYmVnaW5zLiAgUmVjZWl2ZXMgdGhlIHN0YXRlIG9mIHRoZSB0d2VlbiBhcyB0aGUgb25seSBwYXJhbWV0ZXIuXHJcbiAgICogLSBfX3N0ZXBfXyAoX0Z1bmN0aW9uKE9iamVjdCk9Xyk6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZXZlcnkgdGljay4gIFJlY2VpdmVzIHRoZSBzdGF0ZSBvZiB0aGUgdHdlZW4gYXMgdGhlIG9ubHkgcGFyYW1ldGVyLiAgVGhpcyBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9uIHRoZSBmaW5hbCBzdGVwIG9mIHRoZSBhbmltYXRpb24sIGJ1dCBgZmluaXNoYCBpcy5cclxuICAgKiAtIF9fZmluaXNoX18gKF9GdW5jdGlvbihPYmplY3QpPV8pOiBGdW5jdGlvbiB0byBleGVjdXRlIHVwb24gdHdlZW4gY29tcGxldGlvbi4gIFJlY2VpdmVzIHRoZSBzdGF0ZSBvZiB0aGUgdHdlZW4gYXMgdGhlIG9ubHkgcGFyYW1ldGVyLlxyXG4gICAqIC0gX19lYXNpbmdfXyAoX09iamVjdHxzdHJpbmc9Xyk6IEVhc2luZyBjdXJ2ZSBuYW1lKHMpIHRvIHVzZSBmb3IgdGhlIHR3ZWVuLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcclxuICAgKiBAcmV0dXJuIHtUd2VlbmFibGV9XHJcbiAgICovXHJcbiAgVHdlZW5hYmxlLnByb3RvdHlwZS5zZXRDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICB0aGlzLl9jb25maWd1cmVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBJbml0IHRoZSBpbnRlcm5hbCBzdGF0ZVxyXG4gICAgdGhpcy5fcGF1c2VkQXRUaW1lID0gbnVsbDtcclxuICAgIHRoaXMuX3N0YXJ0ID0gY29uZmlnLnN0YXJ0IHx8IG5vb3A7XHJcbiAgICB0aGlzLl9zdGVwID0gY29uZmlnLnN0ZXAgfHwgbm9vcDtcclxuICAgIHRoaXMuX2ZpbmlzaCA9IGNvbmZpZy5maW5pc2ggfHwgbm9vcDtcclxuICAgIHRoaXMuX2R1cmF0aW9uID0gY29uZmlnLmR1cmF0aW9uIHx8IERFRkFVTFRfRFVSQVRJT047XHJcbiAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBjb25maWcuZnJvbSB8fCB0aGlzLmdldCgpO1xyXG4gICAgdGhpcy5fb3JpZ2luYWxTdGF0ZSA9IHRoaXMuZ2V0KCk7XHJcbiAgICB0aGlzLl90YXJnZXRTdGF0ZSA9IGNvbmZpZy50byB8fCB0aGlzLmdldCgpO1xyXG4gICAgdGhpcy5fdGltZXN0YW1wID0gbm93KCk7XHJcblxyXG4gICAgLy8gQWxpYXNlcyB1c2VkIGJlbG93XHJcbiAgICB2YXIgY3VycmVudFN0YXRlID0gdGhpcy5fY3VycmVudFN0YXRlO1xyXG4gICAgdmFyIHRhcmdldFN0YXRlID0gdGhpcy5fdGFyZ2V0U3RhdGU7XHJcblxyXG4gICAgLy8gRW5zdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyB0byB0d2VlbiB0by5cclxuICAgIGRlZmF1bHRzKHRhcmdldFN0YXRlLCBjdXJyZW50U3RhdGUpO1xyXG5cclxuICAgIHRoaXMuX2Vhc2luZyA9IGNvbXBvc2VFYXNpbmdPYmplY3QoXHJcbiAgICAgIGN1cnJlbnRTdGF0ZSwgY29uZmlnLmVhc2luZyB8fCBERUZBVUxUX0VBU0lORyk7XHJcblxyXG4gICAgdGhpcy5fZmlsdGVyQXJncyA9XHJcbiAgICAgIFtjdXJyZW50U3RhdGUsIHRoaXMuX29yaWdpbmFsU3RhdGUsIHRhcmdldFN0YXRlLCB0aGlzLl9lYXNpbmddO1xyXG5cclxuICAgIGFwcGx5RmlsdGVyKHRoaXMsICd0d2VlbkNyZWF0ZWQnKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgc3RhdGUuXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHNoYWxsb3dDb3B5KHt9LCB0aGlzLl9jdXJyZW50U3RhdGUpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgc3RhdGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXHJcbiAgICovXHJcbiAgVHdlZW5hYmxlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhdXNlcyBhIHR3ZWVuLiAgUGF1c2VkIHR3ZWVucyBjYW4gYmUgcmVzdW1lZCBmcm9tIHRoZSBwb2ludCBhdCB3aGljaCB0aGV5IHdlcmUgcGF1c2VkLiAgVGhpcyBpcyBkaWZmZXJlbnQgdGhhbiBbYHN0b3AoKWBdKCNzdG9wKSwgYXMgdGhhdCBtZXRob2QgY2F1c2VzIGEgdHdlZW4gdG8gc3RhcnQgb3ZlciB3aGVuIGl0IGlzIHJlc3VtZWQuXHJcbiAgICogQHJldHVybiB7VHdlZW5hYmxlfVxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9wYXVzZWRBdFRpbWUgPSBub3coKTtcclxuICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZXMgYSBwYXVzZWQgdHdlZW4uXHJcbiAgICogQHJldHVybiB7VHdlZW5hYmxlfVxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzUGF1c2VkKSB7XHJcbiAgICAgIHRoaXMuX3RpbWVzdGFtcCArPSBub3coKSAtIHRoaXMuX3BhdXNlZEF0VGltZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5faXNUd2VlbmluZyA9IHRydWU7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5fdGltZW91dEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRpbWVvdXRIYW5kbGVyKHNlbGYsIHNlbGYuX3RpbWVzdGFtcCwgc2VsZi5fZHVyYXRpb24sIHNlbGYuX2N1cnJlbnRTdGF0ZSxcclxuICAgICAgICBzZWxmLl9vcmlnaW5hbFN0YXRlLCBzZWxmLl90YXJnZXRTdGF0ZSwgc2VsZi5fZWFzaW5nLCBzZWxmLl9zdGVwLFxyXG4gICAgICAgIHNlbGYuX3NjaGVkdWxlRnVuY3Rpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl90aW1lb3V0SGFuZGxlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGFuZCBjYW5jZWxzIGEgdHdlZW4uXHJcbiAgICogQHBhcmFtIHtib29sZWFuPX0gZ290b0VuZCBJZiBmYWxzZSBvciBvbWl0dGVkLCB0aGUgdHdlZW4ganVzdCBzdG9wcyBhdCBpdHMgY3VycmVudCBzdGF0ZSwgYW5kIHRoZSBcImZpbmlzaFwiIGhhbmRsZXIgaXMgbm90IGludm9rZWQuICBJZiB0cnVlLCB0aGUgdHdlZW5lZCBvYmplY3QncyB2YWx1ZXMgYXJlIGluc3RhbnRseSBzZXQgdG8gdGhlIHRhcmdldCB2YWx1ZXMsIGFuZCBcImZpbmlzaFwiIGlzIGludm9rZWQuXHJcbiAgICogQHJldHVybiB7VHdlZW5hYmxlfVxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChnb3RvRW5kKSB7XHJcbiAgICB0aGlzLl9pc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fdGltZW91dEhhbmRsZXIgPSBub29wO1xyXG5cclxuICAgIGlmIChnb3RvRW5kKSB7XHJcbiAgICAgIHNoYWxsb3dDb3B5KHRoaXMuX2N1cnJlbnRTdGF0ZSwgdGhpcy5fdGFyZ2V0U3RhdGUpO1xyXG4gICAgICBhcHBseUZpbHRlcih0aGlzLCAnYWZ0ZXJUd2VlbkVuZCcpO1xyXG4gICAgICB0aGlzLl9maW5pc2guY2FsbCh0aGlzLCB0aGlzLl9jdXJyZW50U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYSB0d2VlbiBpcyBydW5uaW5nLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgVHdlZW5hYmxlLnByb3RvdHlwZS5pc1BsYXlpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNUd2VlbmluZyAmJiAhdGhpcy5faXNQYXVzZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhIGN1c3RvbSBzY2hlZHVsZSBmdW5jdGlvbi5cclxuICAgKlxyXG4gICAqIElmIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIG5vdCBzZXQgdGhlIGRlZmF1bHQgb25lIGlzIHVzZWQgW2ByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgW2BzZXRUaW1lb3V0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy5zZXRUaW1lb3V0KSkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uKEZ1bmN0aW9uLG51bWJlcil9IHNjaGVkdWxlRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB0byBzY2hlZHVsZSB0aGUgbmV4dCBmcmFtZSB0byBiZSByZW5kZXJlZFxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc2V0U2NoZWR1bGVGdW5jdGlvbiA9IGZ1bmN0aW9uIChzY2hlZHVsZUZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLl9zY2hlZHVsZUZ1bmN0aW9uID0gc2NoZWR1bGVGdW5jdGlvbjtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBgZGVsZXRlYHMgYWxsIFwib3duXCIgcHJvcGVydGllcy4gIENhbGwgdGhpcyB3aGVuIHRoZSBgVHdlZW5hYmxlYCBpbnN0YW5jZSBpcyBubyBsb25nZXIgbmVlZGVkIHRvIGZyZWUgbWVtb3J5LlxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwcm9wO1xyXG4gICAgZm9yIChwcm9wIGluIHRoaXMpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICBkZWxldGUgdGhpc1twcm9wXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qIVxyXG4gICAqIEZpbHRlcnMgYXJlIHVzZWQgZm9yIHRyYW5zZm9ybWluZyB0aGUgcHJvcGVydGllcyBvZiBhIHR3ZWVuIGF0IHZhcmlvdXNcclxuICAgKiBwb2ludHMgaW4gYSBUd2VlbmFibGUncyBsaWZlIGN5Y2xlLiAgU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mbyBvbiB0aGlzLlxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuZmlsdGVyID0ge307XHJcblxyXG4gIC8qIVxyXG4gICAqIFRoaXMgb2JqZWN0IGNvbnRhaW5zIGFsbCBvZiB0aGUgdHdlZW5zIGF2YWlsYWJsZSB0byBTaGlmdHkuICBJdCBpcyBleHRlbmRpYmxlIC0gc2ltcGx5IGF0dGFjaCBwcm9wZXJ0aWVzIHRvIHRoZSBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGEgT2JqZWN0IGZvbGxvd2luZyB0aGUgc2FtZSBmb3JtYXQgYXQgbGluZWFyLlxyXG4gICAqXHJcbiAgICogYHBvc2Agc2hvdWxkIGJlIGEgbm9ybWFsaXplZCBgbnVtYmVyYCAoYmV0d2VlbiAwIGFuZCAxKS5cclxuICAgKi9cclxuICBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGEgPSB7XHJcbiAgICBsaW5lYXI6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBmb3JtdWxhID0gVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhO1xyXG5cclxuICBzaGFsbG93Q29weShUd2VlbmFibGUsIHtcclxuICAgICdub3cnOiBub3dcclxuICAgICwnZWFjaCc6IGVhY2hcclxuICAgICwndHdlZW5Qcm9wcyc6IHR3ZWVuUHJvcHNcclxuICAgICwndHdlZW5Qcm9wJzogdHdlZW5Qcm9wXHJcbiAgICAsJ2FwcGx5RmlsdGVyJzogYXBwbHlGaWx0ZXJcclxuICAgICwnc2hhbGxvd0NvcHknOiBzaGFsbG93Q29weVxyXG4gICAgLCdkZWZhdWx0cyc6IGRlZmF1bHRzXHJcbiAgICAsJ2NvbXBvc2VFYXNpbmdPYmplY3QnOiBjb21wb3NlRWFzaW5nT2JqZWN0XHJcbiAgfSk7XHJcblxyXG4gIC8vIGByb290YCBpcyBwcm92aWRlZCBpbiB0aGUgaW50cm8vb3V0cm8gZmlsZXMuXHJcblxyXG4gIC8vIEEgaG9vayB1c2VkIGZvciB1bml0IHRlc3RpbmcuXHJcbiAgaWYgKHR5cGVvZiBTSElGVFlfREVCVUdfTk9XID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICByb290LnRpbWVvdXRIYW5kbGVyID0gdGltZW91dEhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICAvLyBCb290c3RyYXAgVHdlZW5hYmxlIGFwcHJvcHJpYXRlbHkgZm9yIHRoZSBlbnZpcm9ubWVudC5cclxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAvLyBDb21tb25KU1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBUd2VlbmFibGU7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIC8vIEFNRFxyXG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtyZXR1cm4gVHdlZW5hYmxlO30pO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHJvb3QuVHdlZW5hYmxlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgLy8gQnJvd3NlcjogTWFrZSBgVHdlZW5hYmxlYCBnbG9iYWxseSBhY2Nlc3NpYmxlLlxyXG4gICAgcm9vdC5Ud2VlbmFibGUgPSBUd2VlbmFibGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gVHdlZW5hYmxlO1xyXG5cclxufSAoKSk7XHJcblxyXG4vKiFcclxuICogQWxsIGVxdWF0aW9ucyBhcmUgYWRhcHRlZCBmcm9tIFRob21hcyBGdWNocycgW1NjcmlwdHkyXShodHRwczovL2dpdGh1Yi5jb20vbWFkcm9iYnkvc2NyaXB0eTIvYmxvYi9tYXN0ZXIvc3JjL2VmZmVjdHMvdHJhbnNpdGlvbnMvcGVubmVyLmpzKS5cclxuICpcclxuICogQmFzZWQgb24gRWFzaW5nIEVxdWF0aW9ucyAoYykgMjAwMyBbUm9iZXJ0IFBlbm5lcl0oaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tLyksIGFsbCByaWdodHMgcmVzZXJ2ZWQuIFRoaXMgd29yayBpcyBbc3ViamVjdCB0byB0ZXJtc10oaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZ190ZXJtc19vZl91c2UuaHRtbCkuXHJcbiAqL1xyXG5cclxuLyohXHJcbiAqICBURVJNUyBPRiBVU0UgLSBFQVNJTkcgRVFVQVRJT05TXHJcbiAqICBPcGVuIHNvdXJjZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UuXHJcbiAqICBFYXNpbmcgRXF1YXRpb25zIChjKSAyMDAzIFJvYmVydCBQZW5uZXIsIGFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuOyhmdW5jdGlvbiAoKSB7XHJcblxyXG4gIFR3ZWVuYWJsZS5zaGFsbG93Q29weShUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGEsIHtcclxuICAgIGVhc2VJblF1YWQ6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucG93KHBvcywgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VPdXRRdWFkOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiAtKE1hdGgucG93KChwb3MgLSAxKSwgMikgLSAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgZWFzZUluT3V0UXVhZDogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsMik7fVxyXG4gICAgICByZXR1cm4gLTAuNSAqICgocG9zIC09IDIpICogcG9zIC0gMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJbkN1YmljOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlT3V0Q3ViaWM6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIChNYXRoLnBvdygocG9zIC0gMSksIDMpICsgMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJbk91dEN1YmljOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcywzKTt9XHJcbiAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3coKHBvcyAtIDIpLDMpICsgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJblF1YXJ0OiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlT3V0UXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIC0oTWF0aC5wb3coKHBvcyAtIDEpLCA0KSAtIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlSW5PdXRRdWFydDogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsNCk7fVxyXG4gICAgICByZXR1cm4gLTAuNSAqICgocG9zIC09IDIpICogTWF0aC5wb3cocG9zLDMpIC0gMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJblF1aW50OiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlT3V0UXVpbnQ6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIChNYXRoLnBvdygocG9zIC0gMSksIDUpICsgMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJbk91dFF1aW50OiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcyw1KTt9XHJcbiAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3coKHBvcyAtIDIpLDUpICsgMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJblNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIC1NYXRoLmNvcyhwb3MgKiAoTWF0aC5QSSAvIDIpKSArIDE7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VPdXRTaW5lOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnNpbihwb3MgKiAoTWF0aC5QSSAvIDIpKTtcclxuICAgIH0sXHJcblxyXG4gICAgZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICByZXR1cm4gKC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHBvcykgLSAxKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJbkV4cG86IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIChwb3MgPT09IDApID8gMCA6IE1hdGgucG93KDIsIDEwICogKHBvcyAtIDEpKTtcclxuICAgIH0sXHJcblxyXG4gICAgZWFzZU91dEV4cG86IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIChwb3MgPT09IDEpID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiBwb3MpICsgMTtcclxuICAgIH0sXHJcblxyXG4gICAgZWFzZUluT3V0RXhwbzogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICBpZiAocG9zID09PSAwKSB7cmV0dXJuIDA7fVxyXG4gICAgICBpZiAocG9zID09PSAxKSB7cmV0dXJuIDE7fVxyXG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdygyLDEwICogKHBvcyAtIDEpKTt9XHJcbiAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tcG9zKSArIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlSW5DaXJjOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gKHBvcyAqIHBvcykpIC0gMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VPdXRDaXJjOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KChwb3MgLSAxKSwgMikpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlSW5PdXRDaXJjOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSBwb3MgKiBwb3MpIC0gMSk7fVxyXG4gICAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHBvcyAtPSAyKSAqIHBvcykgKyAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgZWFzZU91dEJvdW5jZTogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICBpZiAoKHBvcykgPCAoMSAvIDIuNzUpKSB7XHJcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiBwb3MgKiBwb3MpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyIC8gMi43NSkpIHtcclxuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIChwb3MgLT0gKDEuNSAvIDIuNzUpKSAqIHBvcyArIDAuNzUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyLjUgLyAyLjc1KSkge1xyXG4gICAgICAgIHJldHVybiAoNy41NjI1ICogKHBvcyAtPSAoMi4yNSAvIDIuNzUpKSAqIHBvcyArIDAuOTM3NSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAocG9zIC09ICgyLjYyNSAvIDIuNzUpKSAqIHBvcyArIDAuOTg0Mzc1KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlSW5CYWNrOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHZhciBzID0gMS43MDE1ODtcclxuICAgICAgcmV0dXJuIChwb3MpICogcG9zICogKChzICsgMSkgKiBwb3MgLSBzKTtcclxuICAgIH0sXHJcblxyXG4gICAgZWFzZU91dEJhY2s6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICByZXR1cm4gKHBvcyA9IHBvcyAtIDEpICogcG9zICogKChzICsgMSkgKiBwb3MgKyBzKSArIDE7XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VJbk91dEJhY2s6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiAocG9zICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zIC0gcykpO31cclxuICAgICAgcmV0dXJuIDAuNSAqICgocG9zIC09IDIpICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zICsgcykgKyAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgZWxhc3RpYzogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICByZXR1cm4gLTEgKiBNYXRoLnBvdyg0LC04ICogcG9zKSAqIE1hdGguc2luKChwb3MgKiA2IC0gMSkgKiAoMiAqIE1hdGguUEkpIC8gMikgKyAxO1xyXG4gICAgfSxcclxuXHJcbiAgICBzd2luZ0Zyb21UbzogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XHJcbiAgICAgIHJldHVybiAoKHBvcyAvPSAwLjUpIDwgMSkgPyAwLjUgKiAocG9zICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zIC0gcykpIDpcclxuICAgICAgICAgIDAuNSAqICgocG9zIC09IDIpICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zICsgcykgKyAyKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3dpbmdGcm9tOiBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICAgIHZhciBzID0gMS43MDE1ODtcclxuICAgICAgcmV0dXJuIHBvcyAqIHBvcyAqICgocyArIDEpICogcG9zIC0gcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN3aW5nVG86IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICByZXR1cm4gKHBvcyAtPSAxKSAqIHBvcyAqICgocyArIDEpICogcG9zICsgcykgKyAxO1xyXG4gICAgfSxcclxuXHJcbiAgICBib3VuY2U6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgaWYgKHBvcyA8ICgxIC8gMi43NSkpIHtcclxuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHBvcyAqIHBvcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIgLyAyLjc1KSkge1xyXG4gICAgICAgIHJldHVybiAoNy41NjI1ICogKHBvcyAtPSAoMS41IC8gMi43NSkpICogcG9zICsgMC43NSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIuNSAvIDIuNzUpKSB7XHJcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAocG9zIC09ICgyLjI1IC8gMi43NSkpICogcG9zICsgMC45Mzc1KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIChwb3MgLT0gKDIuNjI1IC8gMi43NSkpICogcG9zICsgMC45ODQzNzUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJvdW5jZVBhc3Q6IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgaWYgKHBvcyA8ICgxIC8gMi43NSkpIHtcclxuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHBvcyAqIHBvcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIgLyAyLjc1KSkge1xyXG4gICAgICAgIHJldHVybiAyIC0gKDcuNTYyNSAqIChwb3MgLT0gKDEuNSAvIDIuNzUpKSAqIHBvcyArIDAuNzUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyLjUgLyAyLjc1KSkge1xyXG4gICAgICAgIHJldHVybiAyIC0gKDcuNTYyNSAqIChwb3MgLT0gKDIuMjUgLyAyLjc1KSkgKiBwb3MgKyAwLjkzNzUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAyIC0gKDcuNTYyNSAqIChwb3MgLT0gKDIuNjI1IC8gMi43NSkpICogcG9zICsgMC45ODQzNzUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGVhc2VGcm9tVG86IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgaWYgKChwb3MgLz0gMC41KSA8IDEpIHtyZXR1cm4gMC41ICogTWF0aC5wb3cocG9zLDQpO31cclxuICAgICAgcmV0dXJuIC0wLjUgKiAoKHBvcyAtPSAyKSAqIE1hdGgucG93KHBvcywzKSAtIDIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlRnJvbTogZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICByZXR1cm4gTWF0aC5wb3cocG9zLDQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlYXNlVG86IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucG93KHBvcywwLjI1KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbn0oKSk7XHJcblxyXG4vKiFcclxuICogVGhlIEJlemllciBtYWdpYyBpbiB0aGlzIGZpbGUgaXMgYWRhcHRlZC9jb3BpZWQgYWxtb3N0IHdob2xlc2FsZSBmcm9tXHJcbiAqIFtTY3JpcHR5Ml0oaHR0cHM6Ly9naXRodWIuY29tL21hZHJvYmJ5L3NjcmlwdHkyL2Jsb2IvbWFzdGVyL3NyYy9lZmZlY3RzL3RyYW5zaXRpb25zL2N1YmljLWJlemllci5qcyksXHJcbiAqIHdoaWNoIHdhcyBhZGFwdGVkIGZyb20gQXBwbGUgY29kZSAod2hpY2ggcHJvYmFibHkgY2FtZSBmcm9tXHJcbiAqIFtoZXJlXShodHRwOi8vb3BlbnNvdXJjZS5hcHBsZS5jb20vc291cmNlL1dlYkNvcmUvV2ViQ29yZS05NTUuNjYvcGxhdGZvcm0vZ3JhcGhpY3MvVW5pdEJlemllci5oKSkuXHJcbiAqIFNwZWNpYWwgdGhhbmtzIHRvIEFwcGxlIGFuZCBUaG9tYXMgRnVjaHMgZm9yIG11Y2ggb2YgdGhpcyBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIVxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDA2IEFwcGxlIENvbXB1dGVyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcclxuICogIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxyXG4gKlxyXG4gKiAgMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxyXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cclxuICpcclxuICogIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcclxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cclxuICogIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxyXG4gKlxyXG4gKiAgMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlcihzKSBub3IgdGhlIG5hbWVzIG9mIGFueVxyXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb21cclxuICogIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXHJcbiAqXHJcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTXHJcbiAqICBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sXHJcbiAqICBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcclxuICogIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEVcclxuICogIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcclxuICogIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcclxuICogIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxyXG4gKiAgQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcclxuICogIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXHJcbiAqICBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cclxuICovXHJcbjsoZnVuY3Rpb24gKCkge1xyXG4gIC8vIHBvcnQgb2Ygd2Via2l0IGN1YmljIGJlemllciBoYW5kbGluZyBieSBodHRwOi8vd3d3Lm5ldHpnZXN0YS5kZS9kZXYvXHJcbiAgZnVuY3Rpb24gY3ViaWNCZXppZXJBdFRpbWUodCxwMXgscDF5LHAyeCxwMnksZHVyYXRpb24pIHtcclxuICAgIHZhciBheCA9IDAsYnggPSAwLGN4ID0gMCxheSA9IDAsYnkgPSAwLGN5ID0gMDtcclxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWCh0KSB7cmV0dXJuICgoYXggKiB0ICsgYngpICogdCArIGN4KSAqIHQ7fVxyXG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVZKHQpIHtyZXR1cm4gKChheSAqIHQgKyBieSkgKiB0ICsgY3kpICogdDt9XHJcbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQpIHtyZXR1cm4gKDMuMCAqIGF4ICogdCArIDIuMCAqIGJ4KSAqIHQgKyBjeDt9XHJcbiAgICBmdW5jdGlvbiBzb2x2ZUVwc2lsb24oZHVyYXRpb24pIHtyZXR1cm4gMS4wIC8gKDIwMC4wICogZHVyYXRpb24pO31cclxuICAgIGZ1bmN0aW9uIHNvbHZlKHgsZXBzaWxvbikge3JldHVybiBzYW1wbGVDdXJ2ZVkoc29sdmVDdXJ2ZVgoeCxlcHNpbG9uKSk7fVxyXG4gICAgZnVuY3Rpb24gZmFicyhuKSB7aWYgKG4gPj0gMCkge3JldHVybiBuO31lbHNlIHtyZXR1cm4gMCAtIG47fX1cclxuICAgIGZ1bmN0aW9uIHNvbHZlQ3VydmVYKHgsZXBzaWxvbikge1xyXG4gICAgICB2YXIgdDAsdDEsdDIseDIsZDIsaTtcclxuICAgICAgZm9yICh0MiA9IHgsIGkgPSAwOyBpIDwgODsgaSsrKSB7eDIgPSBzYW1wbGVDdXJ2ZVgodDIpIC0geDsgaWYgKGZhYnMoeDIpIDwgZXBzaWxvbikge3JldHVybiB0Mjt9IGQyID0gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0Mik7IGlmIChmYWJzKGQyKSA8IDFlLTYpIHticmVhazt9IHQyID0gdDIgLSB4MiAvIGQyO31cclxuICAgICAgdDAgPSAwLjA7IHQxID0gMS4wOyB0MiA9IHg7IGlmICh0MiA8IHQwKSB7cmV0dXJuIHQwO30gaWYgKHQyID4gdDEpIHtyZXR1cm4gdDE7fVxyXG4gICAgICB3aGlsZSAodDAgPCB0MSkge3gyID0gc2FtcGxlQ3VydmVYKHQyKTsgaWYgKGZhYnMoeDIgLSB4KSA8IGVwc2lsb24pIHtyZXR1cm4gdDI7fSBpZiAoeCA+IHgyKSB7dDAgPSB0Mjt9ZWxzZSB7dDEgPSB0Mjt9IHQyID0gKHQxIC0gdDApICogMC41ICsgdDA7fVxyXG4gICAgICByZXR1cm4gdDI7IC8vIEZhaWx1cmUuXHJcbiAgICB9XHJcbiAgICBjeCA9IDMuMCAqIHAxeDsgYnggPSAzLjAgKiAocDJ4IC0gcDF4KSAtIGN4OyBheCA9IDEuMCAtIGN4IC0gYng7IGN5ID0gMy4wICogcDF5OyBieSA9IDMuMCAqIChwMnkgLSBwMXkpIC0gY3k7IGF5ID0gMS4wIC0gY3kgLSBieTtcclxuICAgIHJldHVybiBzb2x2ZSh0LCBzb2x2ZUVwc2lsb24oZHVyYXRpb24pKTtcclxuICB9XHJcbiAgLyohXHJcbiAgICogIGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbih4MSwgeTEsIHgyLCB5MikgLT4gRnVuY3Rpb25cclxuICAgKlxyXG4gICAqICBHZW5lcmF0ZXMgYSB0cmFuc2l0aW9uIGVhc2luZyBmdW5jdGlvbiB0aGF0IGlzIGNvbXBhdGlibGVcclxuICAgKiAgd2l0aCBXZWJLaXQncyBDU1MgdHJhbnNpdGlvbnMgYC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25gXHJcbiAgICogIENTUyBwcm9wZXJ0eS5cclxuICAgKlxyXG4gICAqICBUaGUgVzNDIGhhcyBtb3JlIGluZm9ybWF0aW9uIGFib3V0XHJcbiAgICogIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXRyYW5zaXRpb25zLyN0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbl90YWdcIj5cclxuICAgKiAgQ1NTMyB0cmFuc2l0aW9uIHRpbWluZyBmdW5jdGlvbnM8L2E+LlxyXG4gICAqXHJcbiAgICogIEBwYXJhbSB7bnVtYmVyfSB4MVxyXG4gICAqICBAcGFyYW0ge251bWJlcn0geTFcclxuICAgKiAgQHBhcmFtIHtudW1iZXJ9IHgyXHJcbiAgICogIEBwYXJhbSB7bnVtYmVyfSB5MlxyXG4gICAqICBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICAgKi9cclxuICBmdW5jdGlvbiBnZXRDdWJpY0JlemllclRyYW5zaXRpb24gKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBvcykge1xyXG4gICAgICByZXR1cm4gY3ViaWNCZXppZXJBdFRpbWUocG9zLHgxLHkxLHgyLHkyLDEpO1xyXG4gICAgfTtcclxuICB9XHJcbiAgLy8gRW5kIHBvcnRlZCBjb2RlXHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBCZXppZXIgZWFzaW5nIGZ1bmN0aW9uIGFuZCBhdHRhY2hlcyBpdCB0byBgVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhYC4gIFRoaXMgZnVuY3Rpb24gZ2l2ZXMgeW91IHRvdGFsIGNvbnRyb2wgb3ZlciB0aGUgZWFzaW5nIGN1cnZlLiAgTWF0dGhldyBMZWluJ3MgW0NlYXNlcl0oaHR0cDovL21hdHRoZXdsZWluLmNvbS9jZWFzZXIvKSBpcyBhIHVzZWZ1bCB0b29sIGZvciB2aXN1YWxpemluZyB0aGUgY3VydmVzIHlvdSBjYW4gbWFrZSB3aXRoIHRoaXMgZnVuY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWFzaW5nIGN1cnZlLiAgT3ZlcndyaXRlcyB0aGUgb2xkIGVhc2luZyBmdW5jdGlvbiBvbiBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGEgaWYgaXQgZXhpc3RzLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4MVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5MVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4MlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5MlxyXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRoYXQgd2FzIGF0dGFjaGVkIHRvIFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYS5cclxuICAgKi9cclxuICBUd2VlbmFibGUuc2V0QmV6aWVyRnVuY3Rpb24gPSBmdW5jdGlvbiAobmFtZSwgeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIHZhciBjdWJpY0JlemllclRyYW5zaXRpb24gPSBnZXRDdWJpY0JlemllclRyYW5zaXRpb24oeDEsIHkxLCB4MiwgeTIpO1xyXG4gICAgY3ViaWNCZXppZXJUcmFuc2l0aW9uLngxID0geDE7XHJcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueTEgPSB5MTtcclxuICAgIGN1YmljQmV6aWVyVHJhbnNpdGlvbi54MiA9IHgyO1xyXG4gICAgY3ViaWNCZXppZXJUcmFuc2l0aW9uLnkyID0geTI7XHJcblxyXG4gICAgcmV0dXJuIFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYVtuYW1lXSA9IGN1YmljQmV6aWVyVHJhbnNpdGlvbjtcclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogYGRlbGV0ZWBzIGFuIGVhc2luZyBmdW5jdGlvbiBmcm9tIGBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGFgLiAgQmUgY2FyZWZ1bCB3aXRoIHRoaXMgbWV0aG9kLCBhcyBpdCBgZGVsZXRlYHMgd2hhdGV2ZXIgZWFzaW5nIGZvcm11bGEgbWF0Y2hlcyBgbmFtZWAgKHdoaWNoIG1lYW5zIHlvdSBjYW4gZGVsZXRlIGRlZmF1bHQgU2hpZnR5IGVhc2luZyBmdW5jdGlvbnMpLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVhc2luZyBmdW5jdGlvbiB0byBkZWxldGUuXHJcbiAgICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAgICovXHJcbiAgVHdlZW5hYmxlLnVuc2V0QmV6aWVyRnVuY3Rpb24gPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgZGVsZXRlIFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYVtuYW1lXTtcclxuICB9O1xyXG5cclxufSkoKTtcclxuXHJcbjsoZnVuY3Rpb24gKCkge1xyXG5cclxuICBmdW5jdGlvbiBnZXRJbnRlcnBvbGF0ZWRWYWx1ZXMgKFxyXG4gICAgZnJvbSwgY3VycmVudCwgdGFyZ2V0U3RhdGUsIHBvc2l0aW9uLCBlYXNpbmcpIHtcclxuICAgIHJldHVybiBUd2VlbmFibGUudHdlZW5Qcm9wcyhcclxuICAgICAgcG9zaXRpb24sIGN1cnJlbnQsIGZyb20sIHRhcmdldFN0YXRlLCAxLCAwLCBlYXNpbmcpO1xyXG4gIH1cclxuXHJcbiAgLy8gRmFrZSBhIFR3ZWVuYWJsZSBhbmQgcGF0Y2ggc29tZSBpbnRlcm5hbHMuICBUaGlzIGFwcHJvYWNoIGFsbG93cyB1cyB0b1xyXG4gIC8vIHNraXAgdW5lY2Nlc3NhcnkgcHJvY2Vzc2luZyBhbmQgb2JqZWN0IHJlY3JlYXRpb24sIGN1dHRpbmcgZG93biBvbiBnYXJiYWdlXHJcbiAgLy8gY29sbGVjdGlvbiBwYXVzZXMuXHJcbiAgdmFyIG1vY2tUd2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XHJcbiAgbW9ja1R3ZWVuYWJsZS5fZmlsdGVyQXJncyA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIHRoZSBtaWRwb2ludCBvZiB0d28gT2JqZWN0cy4gIFRoaXMgbWV0aG9kIGVmZmVjdGl2ZWx5IGNhbGN1bGF0ZXMgYSBzcGVjaWZpYyBmcmFtZSBvZiBhbmltYXRpb24gdGhhdCBbVHdlZW5hYmxlI3R3ZWVuXShzaGlmdHkuY29yZS5qcy5odG1sI3R3ZWVuKSBkb2VzIG1hbnkgdGltZXMgb3ZlciB0aGUgY291cnNlIG9mIGEgdHdlZW4uXHJcbiAgICpcclxuICAgKiBFeGFtcGxlOlxyXG4gICAqXHJcbiAgICogYGBgXHJcbiAgICogIHZhciBpbnRlcnBvbGF0ZWRWYWx1ZXMgPSBUd2VlbmFibGUuaW50ZXJwb2xhdGUoe1xyXG4gICAqICAgIHdpZHRoOiAnMTAwcHgnLFxyXG4gICAqICAgIG9wYWNpdHk6IDAsXHJcbiAgICogICAgY29sb3I6ICcjZmZmJ1xyXG4gICAqICB9LCB7XHJcbiAgICogICAgd2lkdGg6ICcyMDBweCcsXHJcbiAgICogICAgb3BhY2l0eTogMSxcclxuICAgKiAgICBjb2xvcjogJyMwMDAnXHJcbiAgICogIH0sIDAuNSk7XHJcbiAgICpcclxuICAgKiAgY29uc29sZS5sb2coaW50ZXJwb2xhdGVkVmFsdWVzKTtcclxuICAgKiAgLy8ge29wYWNpdHk6IDAuNSwgd2lkdGg6IFwiMTUwcHhcIiwgY29sb3I6IFwicmdiKDEyNywxMjcsMTI3KVwifVxyXG4gICAqIGBgYFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGZyb20gVGhlIHN0YXJ0aW5nIHZhbHVlcyB0byB0d2VlbiBmcm9tLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRTdGF0ZSBUaGUgZW5kaW5nIHZhbHVlcyB0byB0d2VlbiB0by5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24gVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24gdmFsdWUgKGJldHdlZW4gMC4wIGFuZCAxLjApIHRvIGludGVycG9sYXRlIHRoZSB2YWx1ZXMgYmV0d2VlbiBgZnJvbWAgYW5kIGB0b2AgZm9yLiAgYGZyb21gIHJlcHJlc2VudHMgMCBhbmQgYHRvYCByZXByZXNlbnRzIGAxYC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IGVhc2luZyBUaGUgZWFzaW5nIGN1cnZlKHMpIHRvIGNhbGN1bGF0ZSB0aGUgbWlkcG9pbnQgYWdhaW5zdC4gIFlvdSBjYW4gcmVmZXJlbmNlIGFueSBlYXNpbmcgZnVuY3Rpb24gYXR0YWNoZWQgdG8gYFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYWAuICBJZiBvbWl0dGVkLCB0aGlzIGRlZmF1bHRzIHRvIFwibGluZWFyXCIuXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIFR3ZWVuYWJsZS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIChmcm9tLCB0YXJnZXRTdGF0ZSwgcG9zaXRpb24sIGVhc2luZykge1xyXG4gICAgdmFyIGN1cnJlbnQgPSBUd2VlbmFibGUuc2hhbGxvd0NvcHkoe30sIGZyb20pO1xyXG4gICAgdmFyIGVhc2luZ09iamVjdCA9IFR3ZWVuYWJsZS5jb21wb3NlRWFzaW5nT2JqZWN0KFxyXG4gICAgICBmcm9tLCBlYXNpbmcgfHwgJ2xpbmVhcicpO1xyXG5cclxuICAgIG1vY2tUd2VlbmFibGUuc2V0KHt9KTtcclxuXHJcbiAgICAvLyBBbGlhcyBhbmQgcmV1c2UgdGhlIF9maWx0ZXJBcmdzIGFycmF5IGluc3RlYWQgb2YgcmVjcmVhdGluZyBpdC5cclxuICAgIHZhciBmaWx0ZXJBcmdzID0gbW9ja1R3ZWVuYWJsZS5fZmlsdGVyQXJncztcclxuICAgIGZpbHRlckFyZ3MubGVuZ3RoID0gMDtcclxuICAgIGZpbHRlckFyZ3NbMF0gPSBjdXJyZW50O1xyXG4gICAgZmlsdGVyQXJnc1sxXSA9IGZyb207XHJcbiAgICBmaWx0ZXJBcmdzWzJdID0gdGFyZ2V0U3RhdGU7XHJcbiAgICBmaWx0ZXJBcmdzWzNdID0gZWFzaW5nT2JqZWN0O1xyXG5cclxuICAgIC8vIEFueSBkZWZpbmVkIHZhbHVlIHRyYW5zZm9ybWF0aW9uIG11c3QgYmUgYXBwbGllZFxyXG4gICAgVHdlZW5hYmxlLmFwcGx5RmlsdGVyKG1vY2tUd2VlbmFibGUsICd0d2VlbkNyZWF0ZWQnKTtcclxuICAgIFR3ZWVuYWJsZS5hcHBseUZpbHRlcihtb2NrVHdlZW5hYmxlLCAnYmVmb3JlVHdlZW4nKTtcclxuXHJcbiAgICB2YXIgaW50ZXJwb2xhdGVkVmFsdWVzID0gZ2V0SW50ZXJwb2xhdGVkVmFsdWVzKFxyXG4gICAgICBmcm9tLCBjdXJyZW50LCB0YXJnZXRTdGF0ZSwgcG9zaXRpb24sIGVhc2luZ09iamVjdCk7XHJcblxyXG4gICAgLy8gVHJhbnNmb3JtIHZhbHVlcyBiYWNrIGludG8gdGhlaXIgb3JpZ2luYWwgZm9ybWF0XHJcbiAgICBUd2VlbmFibGUuYXBwbHlGaWx0ZXIobW9ja1R3ZWVuYWJsZSwgJ2FmdGVyVHdlZW4nKTtcclxuXHJcbiAgICByZXR1cm4gaW50ZXJwb2xhdGVkVmFsdWVzO1xyXG4gIH07XHJcblxyXG59KCkpO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgc3RyaW5nIGludGVycG9sYXRpb24gc3VwcG9ydCB0byBTaGlmdHkuXHJcbiAqXHJcbiAqIFRoZSBUb2tlbiBleHRlbnNpb24gYWxsb3dzIFNoaWZ0eSB0byB0d2VlbiBudW1iZXJzIGluc2lkZSBvZiBzdHJpbmdzLiAgQW1vbmcgb3RoZXIgdGhpbmdzLCB0aGlzIGFsbG93cyB5b3UgdG8gYW5pbWF0ZSBDU1MgcHJvcGVydGllcy4gIEZvciBleGFtcGxlLCB5b3UgY2FuIGRvIHRoaXM6XHJcbiAqXHJcbiAqIGBgYFxyXG4gKiB2YXIgdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xyXG4gKiB0d2VlbmFibGUudHdlZW4oe1xyXG4gKiAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg0NXB4KSd9LFxyXG4gKiAgIHRvOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoOTB4cCknfVxyXG4gKiB9KTtcclxuICogYGBgXHJcbiAqXHJcbiAqIGB0cmFuc2xhdGVYKDQ1KWAgd2lsbCBiZSB0d2VlbmVkIHRvIGB0cmFuc2xhdGVYKDkwKWAuICBUbyBkZW1vbnN0cmF0ZTpcclxuICpcclxuICogYGBgXHJcbiAqIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XHJcbiAqIHR3ZWVuYWJsZS50d2Vlbih7XHJcbiAqICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDQ1cHgpJ30sXHJcbiAqICAgdG86IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg5MHB4KSd9LFxyXG4gKiAgIHN0ZXA6IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gKiAgICAgY29uc29sZS5sb2coc3RhdGUudHJhbnNmb3JtKTtcclxuICogICB9XHJcbiAqIH0pO1xyXG4gKiBgYGBcclxuICpcclxuICogVGhlIGFib3ZlIHNuaXBwZXQgd2lsbCBsb2cgc29tZXRoaW5nIGxpa2UgdGhpcyBpbiB0aGUgY29uc29sZTpcclxuICpcclxuICogYGBgXHJcbiAqIHRyYW5zbGF0ZVgoNjAuM3B4KVxyXG4gKiAuLi5cclxuICogdHJhbnNsYXRlWCg3Ni4wNXB4KVxyXG4gKiAuLi5cclxuICogdHJhbnNsYXRlWCg5MHB4KVxyXG4gKiBgYGBcclxuICpcclxuICogQW5vdGhlciB1c2UgZm9yIHRoaXMgaXMgYW5pbWF0aW5nIGNvbG9yczpcclxuICpcclxuICogYGBgXHJcbiAqIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XHJcbiAqIHR3ZWVuYWJsZS50d2Vlbih7XHJcbiAqICAgZnJvbTogeyBjb2xvcjogJ3JnYigwLDI1NSwwKSd9LFxyXG4gKiAgIHRvOiB7IGNvbG9yOiAncmdiKDI1NSwwLDI1NSknfSxcclxuICogICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICogICAgIGNvbnNvbGUubG9nKHN0YXRlLmNvbG9yKTtcclxuICogICB9XHJcbiAqIH0pO1xyXG4gKiBgYGBcclxuICpcclxuICogVGhlIGFib3ZlIHNuaXBwZXQgd2lsbCBsb2cgc29tZXRoaW5nIGxpa2UgdGhpczpcclxuICpcclxuICogYGBgXHJcbiAqIHJnYig4NCwxNzAsODQpXHJcbiAqIC4uLlxyXG4gKiByZ2IoMTcwLDg0LDE3MClcclxuICogLi4uXHJcbiAqIHJnYigyNTUsMCwyNTUpXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBUaGlzIGV4dGVuc2lvbiBhbHNvIHN1cHBvcnRzIGhleGFkZWNpbWFsIGNvbG9ycywgaW4gYm90aCBsb25nIChgI2ZmMDBmZmApIGFuZCBzaG9ydCAoYCNmMGZgKSBmb3Jtcy4gIEJlIGF3YXJlIHRoYXQgaGV4YWRlY2ltYWwgaW5wdXQgdmFsdWVzIHdpbGwgYmUgY29udmVydGVkIGludG8gdGhlIGVxdWl2YWxlbnQgUkdCIG91dHB1dCB2YWx1ZXMuICBUaGlzIGlzIGRvbmUgdG8gb3B0aW1pemUgZm9yIHBlcmZvcm1hbmNlLlxyXG4gKlxyXG4gKiBgYGBcclxuICogdmFyIHR3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcclxuICogdHdlZW5hYmxlLnR3ZWVuKHtcclxuICogICBmcm9tOiB7IGNvbG9yOiAnIzBmMCd9LFxyXG4gKiAgIHRvOiB7IGNvbG9yOiAnI2YwZid9LFxyXG4gKiAgIHN0ZXA6IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gKiAgICAgY29uc29sZS5sb2coc3RhdGUuY29sb3IpO1xyXG4gKiAgIH1cclxuICogfSk7XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBUaGlzIHNuaXBwZXQgd2lsbCBnZW5lcmF0ZSB0aGUgc2FtZSBvdXRwdXQgYXMgdGhlIG9uZSBiZWZvcmUgaXQgYmVjYXVzZSBlcXVpdmFsZW50IHZhbHVlcyB3ZXJlIHN1cHBsaWVkIChqdXN0IGluIGhleGFkZWNpbWFsIGZvcm0gcmF0aGVyIHRoYW4gUkdCKTpcclxuICpcclxuICogYGBgXHJcbiAqIHJnYig4NCwxNzAsODQpXHJcbiAqIC4uLlxyXG4gKiByZ2IoMTcwLDg0LDE3MClcclxuICogLi4uXHJcbiAqIHJnYigyNTUsMCwyNTUpXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiAjIyBFYXNpbmcgc3VwcG9ydFxyXG4gKlxyXG4gKiBFYXNpbmcgd29ya3Mgc29tZXdoYXQgZGlmZmVyZW50bHkgaW4gdGhlIFRva2VuIGV4dGVuc2lvbi4gIFRoaXMgaXMgYmVjYXVzZSBzb21lIENTUyBwcm9wZXJ0aWVzIGhhdmUgbXVsdGlwbGUgdmFsdWVzIGluIHRoZW0sIGFuZCB5b3UgbWlnaHQgbmVlZCB0byB0d2VlbiBlYWNoIHZhbHVlIGFsb25nIGl0cyBvd24gZWFzaW5nIGN1cnZlLiAgQSBiYXNpYyBleGFtcGxlOlxyXG4gKlxyXG4gKiBgYGBcclxuICogdmFyIHR3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcclxuICogdHdlZW5hYmxlLnR3ZWVuKHtcclxuICogICBmcm9tOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDBweCknfSxcclxuICogICB0bzogeyB0cmFuc2Zvcm06ICAgJ3RyYW5zbGF0ZVgoMTAwcHgpIHRyYW5zbGF0ZVkoMTAwcHgpJ30sXHJcbiAqICAgZWFzaW5nOiB7IHRyYW5zZm9ybTogJ2Vhc2VJblF1YWQnIH0sXHJcbiAqICAgc3RlcDogZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAqICAgICBjb25zb2xlLmxvZyhzdGF0ZS50cmFuc2Zvcm0pO1xyXG4gKiAgIH1cclxuICogfSk7XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgc25pcHBldCBjcmVhdGUgdmFsdWVzIGxpa2UgdGhpczpcclxuICpcclxuICogYGBgXHJcbiAqIHRyYW5zbGF0ZVgoMTEuNTYwMDAwMDAwMDAwMDAycHgpIHRyYW5zbGF0ZVkoMTEuNTYwMDAwMDAwMDAwMDAycHgpXHJcbiAqIC4uLlxyXG4gKiB0cmFuc2xhdGVYKDQ2LjI0MDAwMDAwMDAwMDAxcHgpIHRyYW5zbGF0ZVkoNDYuMjQwMDAwMDAwMDAwMDFweClcclxuICogLi4uXHJcbiAqIHRyYW5zbGF0ZVgoMTAwcHgpIHRyYW5zbGF0ZVkoMTAwcHgpXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBJbiB0aGlzIGNhc2UsIHRoZSB2YWx1ZXMgZm9yIGB0cmFuc2xhdGVYYCBhbmQgYHRyYW5zbGF0ZVlgIGFyZSBhbHdheXMgdGhlIHNhbWUgZm9yIGVhY2ggc3RlcCBvZiB0aGUgdHdlZW4sIGJlY2F1c2UgdGhleSBoYXZlIHRoZSBzYW1lIHN0YXJ0IGFuZCBlbmQgcG9pbnRzIGFuZCBib3RoIHVzZSB0aGUgc2FtZSBlYXNpbmcgY3VydmUuICBXZSBjYW4gYWxzbyB0d2VlbiBgdHJhbnNsYXRlWGAgYW5kIGB0cmFuc2xhdGVZYCBhbG9uZyBpbmRlcGVuZGVudCBjdXJ2ZXM6XHJcbiAqXHJcbiAqIGBgYFxyXG4gKiB2YXIgdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xyXG4gKiB0d2VlbmFibGUudHdlZW4oe1xyXG4gKiAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwcHgpIHRyYW5zbGF0ZVkoMHB4KSd9LFxyXG4gKiAgIHRvOiB7IHRyYW5zZm9ybTogICAndHJhbnNsYXRlWCgxMDBweCkgdHJhbnNsYXRlWSgxMDBweCknfSxcclxuICogICBlYXNpbmc6IHsgdHJhbnNmb3JtOiAnZWFzZUluUXVhZCBib3VuY2UnIH0sXHJcbiAqICAgc3RlcDogZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAqICAgICBjb25zb2xlLmxvZyhzdGF0ZS50cmFuc2Zvcm0pO1xyXG4gKiAgIH1cclxuICogfSk7XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgc25pcHBldCBjcmVhdGUgdmFsdWVzIGxpa2UgdGhpczpcclxuICpcclxuICogYGBgXHJcbiAqIHRyYW5zbGF0ZVgoMTAuODlweCkgdHJhbnNsYXRlWSg4Mi4zNTU2MjVweClcclxuICogLi4uXHJcbiAqIHRyYW5zbGF0ZVgoNDQuODkwMDAwMDAwMDAwMDFweCkgdHJhbnNsYXRlWSg4Ni43MzA2MjUwMDAwMDAwMnB4KVxyXG4gKiAuLi5cclxuICogdHJhbnNsYXRlWCgxMDBweCkgdHJhbnNsYXRlWSgxMDBweClcclxuICogYGBgXHJcbiAqXHJcbiAqIGB0cmFuc2xhdGVYYCBhbmQgYHRyYW5zbGF0ZVlgIGFyZSBub3QgaW4gc3luYyBhbnltb3JlLCBiZWNhdXNlIGBlYXNlSW5RdWFkYCB3YXMgc3BlY2lmaWVkIGZvciBgdHJhbnNsYXRlWGAgYW5kIGBib3VuY2VgIGZvciBgdHJhbnNsYXRlWWAuICBNaXhpbmcgYW5kIG1hdGNoaW5nIGVhc2luZyBjdXJ2ZXMgY2FuIG1ha2UgZm9yIHNvbWUgaW50ZXJlc3RpbmcgbW90aW9uIGluIHlvdXIgYW5pbWF0aW9ucy5cclxuICpcclxuICogVGhlIG9yZGVyIG9mIHRoZSBzcGFjZS1zZXBhcmF0ZWQgZWFzaW5nIGN1cnZlcyBjb3JyZXNwb25kIHRoZSB0b2tlbiB2YWx1ZXMgdGhleSBhcHBseSB0by4gIElmIHRoZXJlIGFyZSBtb3JlIHRva2VuIHZhbHVlcyB0aGFuIGVhc2luZyBjdXJ2ZXMgbGlzdGVkLCB0aGUgbGFzdCBlYXNpbmcgY3VydmUgbGlzdGVkIGlzIHVzZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiB0b2tlbiAoKSB7XHJcbiAgLy8gRnVuY3Rpb25hbGl0eSBmb3IgdGhpcyBleHRlbnNpb24gcnVucyBpbXBsaWNpdGx5IGlmIGl0IGlzIGxvYWRlZC5cclxufSAvKiEqL1xyXG5cclxuLy8gdG9rZW4gZnVuY3Rpb24gaXMgZGVmaW5lZCBhYm92ZSBvbmx5IHNvIHRoYXQgZG94LWZvdW5kYXRpb24gc2VlcyBpdCBhc1xyXG4vLyBkb2N1bWVudGF0aW9uIGFuZCByZW5kZXJzIGl0LiAgSXQgaXMgbmV2ZXIgdXNlZCwgYW5kIGlzIG9wdGltaXplZCBhd2F5IGF0XHJcbi8vIGJ1aWxkIHRpbWUuXHJcblxyXG47KGZ1bmN0aW9uIChUd2VlbmFibGUpIHtcclxuXHJcbiAgLyohXHJcbiAgICogQHR5cGVkZWYge3tcclxuICAgKiAgIGZvcm1hdFN0cmluZzogc3RyaW5nXHJcbiAgICogICBjaHVua05hbWVzOiBBcnJheS48c3RyaW5nPlxyXG4gICAqIH19XHJcbiAgICovXHJcbiAgdmFyIGZvcm1hdE1hbmlmZXN0O1xyXG5cclxuICAvLyBDT05TVEFOVFNcclxuXHJcbiAgdmFyIFJfTlVNQkVSX0NPTVBPTkVOVCA9IC8oXFxkfFxcLXxcXC4pLztcclxuICB2YXIgUl9GT1JNQVRfQ0hVTktTID0gLyhbXlxcLTAtOVxcLl0rKS9nO1xyXG4gIHZhciBSX1VORk9STUFUVEVEX1ZBTFVFUyA9IC9bMC05LlxcLV0rL2c7XHJcbiAgdmFyIFJfUkdCID0gbmV3IFJlZ0V4cChcclxuICAgICdyZ2JcXFxcKCcgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgK1xyXG4gICAgKC8sXFxzKi8uc291cmNlKSArIFJfVU5GT1JNQVRURURfVkFMVUVTLnNvdXJjZSArXHJcbiAgICAoLyxcXHMqLy5zb3VyY2UpICsgUl9VTkZPUk1BVFRFRF9WQUxVRVMuc291cmNlICsgJ1xcXFwpJywgJ2cnKTtcclxuICB2YXIgUl9SR0JfUFJFRklYID0gL14uKlxcKC87XHJcbiAgdmFyIFJfSEVYID0gLyMoWzAtOV18W2EtZl0pezMsNn0vZ2k7XHJcbiAgdmFyIFZBTFVFX1BMQUNFSE9MREVSID0gJ1ZBTCc7XHJcblxyXG4gIC8vIEhFTFBFUlNcclxuXHJcbiAgdmFyIGdldEZvcm1hdENodW5rc0Zyb21fYWNjdW11bGF0b3IgPSBbXTtcclxuICAvKiFcclxuICAgKiBAcGFyYW0ge0FycmF5Lm51bWJlcn0gcmF3VmFsdWVzXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZ2V0Rm9ybWF0Q2h1bmtzRnJvbSAocmF3VmFsdWVzLCBwcmVmaXgpIHtcclxuICAgIGdldEZvcm1hdENodW5rc0Zyb21fYWNjdW11bGF0b3IubGVuZ3RoID0gMDtcclxuXHJcbiAgICB2YXIgcmF3VmFsdWVzTGVuZ3RoID0gcmF3VmFsdWVzLmxlbmd0aDtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCByYXdWYWx1ZXNMZW5ndGg7IGkrKykge1xyXG4gICAgICBnZXRGb3JtYXRDaHVua3NGcm9tX2FjY3VtdWxhdG9yLnB1c2goJ18nICsgcHJlZml4ICsgJ18nICsgaSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdldEZvcm1hdENodW5rc0Zyb21fYWNjdW11bGF0b3I7XHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0dGVkU3RyaW5nXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZ2V0Rm9ybWF0U3RyaW5nRnJvbSAoZm9ybWF0dGVkU3RyaW5nKSB7XHJcbiAgICB2YXIgY2h1bmtzID0gZm9ybWF0dGVkU3RyaW5nLm1hdGNoKFJfRk9STUFUX0NIVU5LUyk7XHJcblxyXG4gICAgaWYgKCFjaHVua3MpIHtcclxuICAgICAgLy8gY2h1bmtzIHdpbGwgYmUgbnVsbCBpZiB0aGVyZSB3ZXJlIG5vIHRva2VucyB0byBwYXJzZSBpblxyXG4gICAgICAvLyBmb3JtYXR0ZWRTdHJpbmcgKGZvciBleGFtcGxlLCBpZiBmb3JtYXR0ZWRTdHJpbmcgaXMgJzInKS4gIENvZXJjZVxyXG4gICAgICAvLyBjaHVua3MgdG8gYmUgdXNlZnVsIGhlcmUuXHJcbiAgICAgIGNodW5rcyA9IFsnJywgJyddO1xyXG5cclxuICAgICAgLy8gSWYgdGhlcmUgaXMgb25seSBvbmUgY2h1bmssIGFzc3VtZSB0aGF0IHRoZSBzdHJpbmcgaXMgYSBudW1iZXJcclxuICAgICAgLy8gZm9sbG93ZWQgYnkgYSB0b2tlbi4uLlxyXG4gICAgICAvLyBOT1RFOiBUaGlzIG1heSBiZSBhbiB1bndpc2UgYXNzdW1wdGlvbi5cclxuICAgIH0gZWxzZSBpZiAoY2h1bmtzLmxlbmd0aCA9PT0gMSB8fFxyXG4gICAgICAgIC8vIC4uLm9yIGlmIHRoZSBzdHJpbmcgc3RhcnRzIHdpdGggYSBudW1iZXIgY29tcG9uZW50IChcIi5cIiwgXCItXCIsIG9yIGFcclxuICAgICAgICAvLyBkaWdpdCkuLi5cclxuICAgICAgICBmb3JtYXR0ZWRTdHJpbmdbMF0ubWF0Y2goUl9OVU1CRVJfQ09NUE9ORU5UKSkge1xyXG4gICAgICAvLyAuLi5wcmVwZW5kIGFuIGVtcHR5IHN0cmluZyBoZXJlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmb3JtYXR0ZWQgbnVtYmVyXHJcbiAgICAgIC8vIGlzIHByb3Blcmx5IHJlcGxhY2VkIGJ5IFZBTFVFX1BMQUNFSE9MREVSXHJcbiAgICAgIGNodW5rcy51bnNoaWZ0KCcnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2h1bmtzLmpvaW4oVkFMVUVfUExBQ0VIT0xERVIpO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQ29udmVydCBhbGwgaGV4IGNvbG9yIHZhbHVlcyB3aXRoaW4gYSBzdHJpbmcgdG8gYW4gcmdiIHN0cmluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgb2JqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gc2FuaXRpemVPYmplY3RGb3JIZXhQcm9wcyAoc3RhdGVPYmplY3QpIHtcclxuICAgIFR3ZWVuYWJsZS5lYWNoKHN0YXRlT2JqZWN0LCBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFByb3AgPT09ICdzdHJpbmcnICYmIGN1cnJlbnRQcm9wLm1hdGNoKFJfSEVYKSkge1xyXG4gICAgICAgIHN0YXRlT2JqZWN0W3Byb3BdID0gc2FuaXRpemVIZXhDaHVua3NUb1JHQihjdXJyZW50UHJvcCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAqXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uICBzYW5pdGl6ZUhleENodW5rc1RvUkdCIChzdHIpIHtcclxuICAgIHJldHVybiBmaWx0ZXJTdHJpbmdDaHVua3MoUl9IRVgsIHN0ciwgY29udmVydEhleFRvUkdCKTtcclxuICB9XHJcblxyXG4gIC8qIVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHJpbmdcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgKi9cclxuICBmdW5jdGlvbiBjb252ZXJ0SGV4VG9SR0IgKGhleFN0cmluZykge1xyXG4gICAgdmFyIHJnYkFyciA9IGhleFRvUkdCQXJyYXkoaGV4U3RyaW5nKTtcclxuICAgIHJldHVybiAncmdiKCcgKyByZ2JBcnJbMF0gKyAnLCcgKyByZ2JBcnJbMV0gKyAnLCcgKyByZ2JBcnJbMl0gKyAnKSc7XHJcbiAgfVxyXG5cclxuICB2YXIgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheSA9IFtdO1xyXG4gIC8qIVxyXG4gICAqIENvbnZlcnQgYSBoZXhhZGVjaW1hbCBzdHJpbmcgdG8gYW4gYXJyYXkgd2l0aCB0aHJlZSBpdGVtcywgb25lIGVhY2ggZm9yXHJcbiAgICogdGhlIHJlZCwgYmx1ZSwgYW5kIGdyZWVuIGRlY2ltYWwgdmFsdWVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhleCBBIGhleGFkZWNpbWFsIHN0cmluZy5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtBcnJheS48bnVtYmVyPn0gVGhlIGNvbnZlcnRlZCBBcnJheSBvZiBSR0IgdmFsdWVzIGlmIGBoZXhgIGlzIGFcclxuICAgKiB2YWxpZCBzdHJpbmcsIG9yIGFuIEFycmF5IG9mIHRocmVlIDAncy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBoZXhUb1JHQkFycmF5IChoZXgpIHtcclxuXHJcbiAgICBoZXggPSBoZXgucmVwbGFjZSgvIy8sICcnKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgc3RyaW5nIGlzIGEgc2hvcnRoYW5kIHRocmVlIGRpZ2l0IGhleCBub3RhdGlvbiwgbm9ybWFsaXplIGl0IHRvXHJcbiAgICAvLyB0aGUgc3RhbmRhcmQgc2l4IGRpZ2l0IG5vdGF0aW9uXHJcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMykge1xyXG4gICAgICBoZXggPSBoZXguc3BsaXQoJycpO1xyXG4gICAgICBoZXggPSBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XHJcbiAgICB9XHJcblxyXG4gICAgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheVswXSA9IGhleFRvRGVjKGhleC5zdWJzdHIoMCwgMikpO1xyXG4gICAgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheVsxXSA9IGhleFRvRGVjKGhleC5zdWJzdHIoMiwgMikpO1xyXG4gICAgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheVsyXSA9IGhleFRvRGVjKGhleC5zdWJzdHIoNCwgMikpO1xyXG5cclxuICAgIHJldHVybiBoZXhUb1JHQkFycmF5X3JldHVybkFycmF5O1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQ29udmVydCBhIGJhc2UtMTYgbnVtYmVyIHRvIGJhc2UtMTAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IGhleCBUaGUgdmFsdWUgdG8gY29udmVydFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2UtMTAgZXF1aXZhbGVudCBvZiBgaGV4YC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBoZXhUb0RlYyAoaGV4KSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoaGV4LCAxNik7XHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBSdW5zIGEgZmlsdGVyIG9wZXJhdGlvbiBvbiBhbGwgY2h1bmtzIG9mIGEgc3RyaW5nIHRoYXQgbWF0Y2ggYSBSZWdFeHBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuZmlsdGVyZWRTdHJpbmdcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyl9IGZpbHRlclxyXG4gICAqXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGZpbHRlclN0cmluZ0NodW5rcyAocGF0dGVybiwgdW5maWx0ZXJlZFN0cmluZywgZmlsdGVyKSB7XHJcbiAgICB2YXIgcGF0dGVuTWF0Y2hlcyA9IHVuZmlsdGVyZWRTdHJpbmcubWF0Y2gocGF0dGVybik7XHJcbiAgICB2YXIgZmlsdGVyZWRTdHJpbmcgPSB1bmZpbHRlcmVkU3RyaW5nLnJlcGxhY2UocGF0dGVybiwgVkFMVUVfUExBQ0VIT0xERVIpO1xyXG5cclxuICAgIGlmIChwYXR0ZW5NYXRjaGVzKSB7XHJcbiAgICAgIHZhciBwYXR0ZW5NYXRjaGVzTGVuZ3RoID0gcGF0dGVuTWF0Y2hlcy5sZW5ndGg7XHJcbiAgICAgIHZhciBjdXJyZW50Q2h1bms7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdHRlbk1hdGNoZXNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGN1cnJlbnRDaHVuayA9IHBhdHRlbk1hdGNoZXMuc2hpZnQoKTtcclxuICAgICAgICBmaWx0ZXJlZFN0cmluZyA9IGZpbHRlcmVkU3RyaW5nLnJlcGxhY2UoXHJcbiAgICAgICAgICBWQUxVRV9QTEFDRUhPTERFUiwgZmlsdGVyKGN1cnJlbnRDaHVuaykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcmVkU3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQ2hlY2sgZm9yIGZsb2F0aW5nIHBvaW50IHZhbHVlcyB3aXRoaW4gcmdiIHN0cmluZ3MgYW5kIHJvdW5kcyB0aGVtLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFN0cmluZ1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHNhbml0aXplUkdCQ2h1bmtzIChmb3JtYXR0ZWRTdHJpbmcpIHtcclxuICAgIHJldHVybiBmaWx0ZXJTdHJpbmdDaHVua3MoUl9SR0IsIGZvcm1hdHRlZFN0cmluZywgc2FuaXRpemVSR0JDaHVuayk7XHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmdiQ2h1bmtcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgKi9cclxuICBmdW5jdGlvbiBzYW5pdGl6ZVJHQkNodW5rIChyZ2JDaHVuaykge1xyXG4gICAgdmFyIG51bWJlcnMgPSByZ2JDaHVuay5tYXRjaChSX1VORk9STUFUVEVEX1ZBTFVFUyk7XHJcbiAgICB2YXIgbnVtYmVyc0xlbmd0aCA9IG51bWJlcnMubGVuZ3RoO1xyXG4gICAgdmFyIHNhbml0aXplZFN0cmluZyA9IHJnYkNodW5rLm1hdGNoKFJfUkdCX1BSRUZJWClbMF07XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2FuaXRpemVkU3RyaW5nICs9IHBhcnNlSW50KG51bWJlcnNbaV0sIDEwKSArICcsJztcclxuICAgIH1cclxuXHJcbiAgICBzYW5pdGl6ZWRTdHJpbmcgPSBzYW5pdGl6ZWRTdHJpbmcuc2xpY2UoMCwgLTEpICsgJyknO1xyXG5cclxuICAgIHJldHVybiBzYW5pdGl6ZWRTdHJpbmc7XHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVPYmplY3RcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH0gQW4gT2JqZWN0IG9mIGZvcm1hdE1hbmlmZXN0cyB0aGF0IGNvcnJlc3BvbmQgdG9cclxuICAgKiB0aGUgc3RyaW5nIHByb3BlcnRpZXMgb2Ygc3RhdGVPYmplY3RcclxuICAgKi9cclxuICBmdW5jdGlvbiBnZXRGb3JtYXRNYW5pZmVzdHMgKHN0YXRlT2JqZWN0KSB7XHJcbiAgICB2YXIgbWFuaWZlc3RBY2N1bXVsYXRvciA9IHt9O1xyXG5cclxuICAgIFR3ZWVuYWJsZS5lYWNoKHN0YXRlT2JqZWN0LCBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFByb3AgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdmFyIHJhd1ZhbHVlcyA9IGdldFZhbHVlc0Zyb20oY3VycmVudFByb3ApO1xyXG5cclxuICAgICAgICBtYW5pZmVzdEFjY3VtdWxhdG9yW3Byb3BdID0ge1xyXG4gICAgICAgICAgJ2Zvcm1hdFN0cmluZyc6IGdldEZvcm1hdFN0cmluZ0Zyb20oY3VycmVudFByb3ApXHJcbiAgICAgICAgICAsJ2NodW5rTmFtZXMnOiBnZXRGb3JtYXRDaHVua3NGcm9tKHJhd1ZhbHVlcywgcHJvcClcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbWFuaWZlc3RBY2N1bXVsYXRvcjtcclxuICB9XHJcblxyXG4gIC8qIVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmb3JtYXRNYW5pZmVzdHNcclxuICAgKi9cclxuICBmdW5jdGlvbiBleHBhbmRGb3JtYXR0ZWRQcm9wZXJ0aWVzIChzdGF0ZU9iamVjdCwgZm9ybWF0TWFuaWZlc3RzKSB7XHJcbiAgICBUd2VlbmFibGUuZWFjaChmb3JtYXRNYW5pZmVzdHMsIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgIHZhciBjdXJyZW50UHJvcCA9IHN0YXRlT2JqZWN0W3Byb3BdO1xyXG4gICAgICB2YXIgcmF3VmFsdWVzID0gZ2V0VmFsdWVzRnJvbShjdXJyZW50UHJvcCk7XHJcbiAgICAgIHZhciByYXdWYWx1ZXNMZW5ndGggPSByYXdWYWx1ZXMubGVuZ3RoO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXdWYWx1ZXNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHN0YXRlT2JqZWN0W2Zvcm1hdE1hbmlmZXN0c1twcm9wXS5jaHVua05hbWVzW2ldXSA9ICtyYXdWYWx1ZXNbaV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlbGV0ZSBzdGF0ZU9iamVjdFtwcm9wXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlT2JqZWN0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGZvcm1hdE1hbmlmZXN0c1xyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNvbGxhcHNlRm9ybWF0dGVkUHJvcGVydGllcyAoc3RhdGVPYmplY3QsIGZvcm1hdE1hbmlmZXN0cykge1xyXG4gICAgVHdlZW5hYmxlLmVhY2goZm9ybWF0TWFuaWZlc3RzLCBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcclxuICAgICAgdmFyIGZvcm1hdENodW5rcyA9IGV4dHJhY3RQcm9wZXJ0eUNodW5rcyhcclxuICAgICAgICBzdGF0ZU9iamVjdCwgZm9ybWF0TWFuaWZlc3RzW3Byb3BdLmNodW5rTmFtZXMpO1xyXG4gICAgICB2YXIgdmFsdWVzTGlzdCA9IGdldFZhbHVlc0xpc3QoXHJcbiAgICAgICAgZm9ybWF0Q2h1bmtzLCBmb3JtYXRNYW5pZmVzdHNbcHJvcF0uY2h1bmtOYW1lcyk7XHJcbiAgICAgIGN1cnJlbnRQcm9wID0gZ2V0Rm9ybWF0dGVkVmFsdWVzKFxyXG4gICAgICAgIGZvcm1hdE1hbmlmZXN0c1twcm9wXS5mb3JtYXRTdHJpbmcsIHZhbHVlc0xpc3QpO1xyXG4gICAgICBzdGF0ZU9iamVjdFtwcm9wXSA9IHNhbml0aXplUkdCQ2h1bmtzKGN1cnJlbnRQcm9wKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlT2JqZWN0XHJcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY2h1bmtOYW1lc1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXh0cmFjdGVkIHZhbHVlIGNodW5rcy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBleHRyYWN0UHJvcGVydHlDaHVua3MgKHN0YXRlT2JqZWN0LCBjaHVua05hbWVzKSB7XHJcbiAgICB2YXIgZXh0cmFjdGVkVmFsdWVzID0ge307XHJcbiAgICB2YXIgY3VycmVudENodW5rTmFtZSwgY2h1bmtOYW1lc0xlbmd0aCA9IGNodW5rTmFtZXMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtOYW1lc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGN1cnJlbnRDaHVua05hbWUgPSBjaHVua05hbWVzW2ldO1xyXG4gICAgICBleHRyYWN0ZWRWYWx1ZXNbY3VycmVudENodW5rTmFtZV0gPSBzdGF0ZU9iamVjdFtjdXJyZW50Q2h1bmtOYW1lXTtcclxuICAgICAgZGVsZXRlIHN0YXRlT2JqZWN0W2N1cnJlbnRDaHVua05hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBleHRyYWN0ZWRWYWx1ZXM7XHJcbiAgfVxyXG5cclxuICB2YXIgZ2V0VmFsdWVzTGlzdF9hY2N1bXVsYXRvciA9IFtdO1xyXG4gIC8qIVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGNodW5rTmFtZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0FycmF5LjxudW1iZXI+fVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGdldFZhbHVlc0xpc3QgKHN0YXRlT2JqZWN0LCBjaHVua05hbWVzKSB7XHJcbiAgICBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yLmxlbmd0aCA9IDA7XHJcbiAgICB2YXIgY2h1bmtOYW1lc0xlbmd0aCA9IGNodW5rTmFtZXMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtOYW1lc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGdldFZhbHVlc0xpc3RfYWNjdW11bGF0b3IucHVzaChzdGF0ZU9iamVjdFtjaHVua05hbWVzW2ldXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdldFZhbHVlc0xpc3RfYWNjdW11bGF0b3I7XHJcbiAgfVxyXG5cclxuICAvKiFcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0U3RyaW5nXHJcbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmF3VmFsdWVzXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkVmFsdWVzIChmb3JtYXRTdHJpbmcsIHJhd1ZhbHVlcykge1xyXG4gICAgdmFyIGZvcm1hdHRlZFZhbHVlU3RyaW5nID0gZm9ybWF0U3RyaW5nO1xyXG4gICAgdmFyIHJhd1ZhbHVlc0xlbmd0aCA9IHJhd1ZhbHVlcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXdWYWx1ZXNMZW5ndGg7IGkrKykge1xyXG4gICAgICBmb3JtYXR0ZWRWYWx1ZVN0cmluZyA9IGZvcm1hdHRlZFZhbHVlU3RyaW5nLnJlcGxhY2UoXHJcbiAgICAgICAgVkFMVUVfUExBQ0VIT0xERVIsICtyYXdWYWx1ZXNbaV0udG9GaXhlZCg0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlU3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogTm90ZTogSXQncyB0aGUgZHV0eSBvZiB0aGUgY2FsbGVyIHRvIGNvbnZlcnQgdGhlIEFycmF5IGVsZW1lbnRzIG9mIHRoZVxyXG4gICAqIHJldHVybiB2YWx1ZSBpbnRvIG51bWJlcnMuICBUaGlzIGlzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFN0cmluZ1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7QXJyYXkuPHN0cmluZz58bnVsbH1cclxuICAgKi9cclxuICBmdW5jdGlvbiBnZXRWYWx1ZXNGcm9tIChmb3JtYXR0ZWRTdHJpbmcpIHtcclxuICAgIHJldHVybiBmb3JtYXR0ZWRTdHJpbmcubWF0Y2goUl9VTkZPUk1BVFRFRF9WQUxVRVMpO1xyXG4gIH1cclxuXHJcbiAgLyohXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ09iamVjdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbkRhdGFcclxuICAgKi9cclxuICBmdW5jdGlvbiBleHBhbmRFYXNpbmdPYmplY3QgKGVhc2luZ09iamVjdCwgdG9rZW5EYXRhKSB7XHJcbiAgICBUd2VlbmFibGUuZWFjaCh0b2tlbkRhdGEsIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgIHZhciBjdXJyZW50UHJvcCA9IHRva2VuRGF0YVtwcm9wXTtcclxuICAgICAgdmFyIGNodW5rTmFtZXMgPSBjdXJyZW50UHJvcC5jaHVua05hbWVzO1xyXG4gICAgICB2YXIgY2h1bmtMZW5ndGggPSBjaHVua05hbWVzLmxlbmd0aDtcclxuICAgICAgdmFyIGVhc2luZ0NodW5rcyA9IGVhc2luZ09iamVjdFtwcm9wXS5zcGxpdCgnICcpO1xyXG4gICAgICB2YXIgbGFzdEVhc2luZ0NodW5rID0gZWFzaW5nQ2h1bmtzW2Vhc2luZ0NodW5rcy5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGVhc2luZ09iamVjdFtjaHVua05hbWVzW2ldXSA9IGVhc2luZ0NodW5rc1tpXSB8fCBsYXN0RWFzaW5nQ2h1bms7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlbGV0ZSBlYXNpbmdPYmplY3RbcHJvcF07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qIVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdPYmplY3RcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5EYXRhXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY29sbGFwc2VFYXNpbmdPYmplY3QgKGVhc2luZ09iamVjdCwgdG9rZW5EYXRhKSB7XHJcbiAgICBUd2VlbmFibGUuZWFjaCh0b2tlbkRhdGEsIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgIHZhciBjdXJyZW50UHJvcCA9IHRva2VuRGF0YVtwcm9wXTtcclxuICAgICAgdmFyIGNodW5rTmFtZXMgPSBjdXJyZW50UHJvcC5jaHVua05hbWVzO1xyXG4gICAgICB2YXIgY2h1bmtMZW5ndGggPSBjaHVua05hbWVzLmxlbmd0aDtcclxuICAgICAgdmFyIGNvbXBvc2VkRWFzaW5nU3RyaW5nID0gJyc7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb21wb3NlZEVhc2luZ1N0cmluZyArPSAnICcgKyBlYXNpbmdPYmplY3RbY2h1bmtOYW1lc1tpXV07XHJcbiAgICAgICAgZGVsZXRlIGVhc2luZ09iamVjdFtjaHVua05hbWVzW2ldXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZWFzaW5nT2JqZWN0W3Byb3BdID0gY29tcG9zZWRFYXNpbmdTdHJpbmcuc3Vic3RyKDEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBUd2VlbmFibGUucHJvdG90eXBlLmZpbHRlci50b2tlbiA9IHtcclxuICAgICd0d2VlbkNyZWF0ZWQnOiBmdW5jdGlvbiAoY3VycmVudFN0YXRlLCBmcm9tU3RhdGUsIHRvU3RhdGUsIGVhc2luZ09iamVjdCkge1xyXG4gICAgICBzYW5pdGl6ZU9iamVjdEZvckhleFByb3BzKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMoZnJvbVN0YXRlKTtcclxuICAgICAgc2FuaXRpemVPYmplY3RGb3JIZXhQcm9wcyh0b1N0YXRlKTtcclxuICAgICAgdGhpcy5fdG9rZW5EYXRhID0gZ2V0Rm9ybWF0TWFuaWZlc3RzKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgICdiZWZvcmVUd2Vlbic6IGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIGZyb21TdGF0ZSwgdG9TdGF0ZSwgZWFzaW5nT2JqZWN0KSB7XHJcbiAgICAgIGV4cGFuZEVhc2luZ09iamVjdChlYXNpbmdPYmplY3QsIHRoaXMuX3Rva2VuRGF0YSk7XHJcbiAgICAgIGV4cGFuZEZvcm1hdHRlZFByb3BlcnRpZXMoY3VycmVudFN0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xyXG4gICAgICBleHBhbmRGb3JtYXR0ZWRQcm9wZXJ0aWVzKGZyb21TdGF0ZSwgdGhpcy5fdG9rZW5EYXRhKTtcclxuICAgICAgZXhwYW5kRm9ybWF0dGVkUHJvcGVydGllcyh0b1N0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAnYWZ0ZXJUd2Vlbic6IGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIGZyb21TdGF0ZSwgdG9TdGF0ZSwgZWFzaW5nT2JqZWN0KSB7XHJcbiAgICAgIGNvbGxhcHNlRm9ybWF0dGVkUHJvcGVydGllcyhjdXJyZW50U3RhdGUsIHRoaXMuX3Rva2VuRGF0YSk7XHJcbiAgICAgIGNvbGxhcHNlRm9ybWF0dGVkUHJvcGVydGllcyhmcm9tU3RhdGUsIHRoaXMuX3Rva2VuRGF0YSk7XHJcbiAgICAgIGNvbGxhcHNlRm9ybWF0dGVkUHJvcGVydGllcyh0b1N0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xyXG4gICAgICBjb2xsYXBzZUVhc2luZ09iamVjdChlYXNpbmdPYmplY3QsIHRoaXMuX3Rva2VuRGF0YSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbn0gKFR3ZWVuYWJsZSkpO1xyXG5cclxufSh0aGlzKSk7XHJcbiIsIi8vIENpcmNsZSBzaGFwZWQgcHJvZ3Jlc3MgYmFyXHJcblxyXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuXHJcblxyXG52YXIgQ2lyY2xlID0gZnVuY3Rpb24gQ2lyY2xlKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG4gICAgLy8gVXNlIHR3byBhcmNzIHRvIGZvcm0gYSBjaXJjbGVcclxuICAgIC8vIFNlZSB0aGlzIGFuc3dlciBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMDQ3NzMzNC8xNDQ2MDkyXHJcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPVxyXG4gICAgICAgICdNIDUwLDUwIG0gMCwte3JhZGl1c30nICtcclxuICAgICAgICAnIGEge3JhZGl1c30se3JhZGl1c30gMCAxIDEgMCx7MnJhZGl1c30nICtcclxuICAgICAgICAnIGEge3JhZGl1c30se3JhZGl1c30gMCAxIDEgMCwtezJyYWRpdXN9JztcclxuXHJcbiAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuQ2lyY2xlLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xyXG5DaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2lyY2xlO1xyXG5cclxuQ2lyY2xlLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IGZ1bmN0aW9uIF9wYXRoU3RyaW5nKG9wdHMpIHtcclxuICAgIHZhciB3aWR0aE9mV2lkZXIgPSBvcHRzLnN0cm9rZVdpZHRoO1xyXG4gICAgaWYgKG9wdHMudHJhaWxXaWR0aCAmJiBvcHRzLnRyYWlsV2lkdGggPiBvcHRzLnN0cm9rZVdpZHRoKSB7XHJcbiAgICAgICAgd2lkdGhPZldpZGVyID0gb3B0cy50cmFpbFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByID0gNTAgLSB3aWR0aE9mV2lkZXIgLyAyO1xyXG5cclxuICAgIHJldHVybiB1dGlscy5yZW5kZXIodGhpcy5fcGF0aFRlbXBsYXRlLCB7XHJcbiAgICAgICAgcmFkaXVzOiByLFxyXG4gICAgICAgICcycmFkaXVzJzogciAqIDJcclxuICAgIH0pO1xyXG59O1xyXG5cclxuQ2lyY2xlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhdGhTdHJpbmcob3B0cyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENpcmNsZTtcclxuIiwiLy8gTGluZSBzaGFwZWQgcHJvZ3Jlc3MgYmFyXHJcblxyXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuXHJcblxyXG52YXIgTGluZSA9IGZ1bmN0aW9uIExpbmUoY29udGFpbmVyLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPSAnTSAwLHtjZW50ZXJ9IEwgMTAwLHtjZW50ZXJ9JztcclxuICAgIFNoYXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5MaW5lLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xyXG5MaW5lLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbmU7XHJcblxyXG5MaW5lLnByb3RvdHlwZS5faW5pdGlhbGl6ZVN2ZyA9IGZ1bmN0aW9uIF9pbml0aWFsaXplU3ZnKHN2Zywgb3B0cykge1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwICcgKyBvcHRzLnN0cm9rZVdpZHRoKTtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAnbm9uZScpO1xyXG59O1xyXG5cclxuTGluZS5wcm90b3R5cGUuX3BhdGhTdHJpbmcgPSBmdW5jdGlvbiBfcGF0aFN0cmluZyhvcHRzKSB7XHJcbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3BhdGhUZW1wbGF0ZSwge1xyXG4gICAgICAgIGNlbnRlcjogb3B0cy5zdHJva2VXaWR0aCAvIDJcclxuICAgIH0pO1xyXG59O1xyXG5cclxuTGluZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nID0gZnVuY3Rpb24gX3RyYWlsU3RyaW5nKG9wdHMpIHtcclxuICAgIHJldHVybiB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMaW5lO1xyXG4iLCIvLyBEaWZmZXJlbnQgc2hhcGVkIHByb2dyZXNzIGJhcnNcclxudmFyIExpbmUgPSByZXF1aXJlKCcuL2xpbmUnKTtcclxudmFyIENpcmNsZSA9IHJlcXVpcmUoJy4vY2lyY2xlJyk7XHJcbnZhciBTcXVhcmUgPSByZXF1aXJlKCcuL3NxdWFyZScpO1xyXG5cclxuLy8gTG93ZXIgbGV2ZWwgQVBJIHRvIHVzZSBhbnkgU1ZHIHBhdGhcclxudmFyIFBhdGggPSByZXF1aXJlKCcuL3BhdGgnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIExpbmU6IExpbmUsXHJcbiAgICBDaXJjbGU6IENpcmNsZSxcclxuICAgIFNxdWFyZTogU3F1YXJlLFxyXG4gICAgUGF0aDogUGF0aFxyXG59O1xyXG4iLCIvLyBMb3dlciBsZXZlbCBBUEkgdG8gYW5pbWF0ZSBhbnkga2luZCBvZiBzdmcgcGF0aFxyXG5cclxudmFyIFR3ZWVuYWJsZSA9IHJlcXVpcmUoJ3NoaWZ0eScpO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcblxyXG52YXIgRUFTSU5HX0FMSUFTRVMgPSB7XHJcbiAgICBlYXNlSW46ICdlYXNlSW5DdWJpYycsXHJcbiAgICBlYXNlT3V0OiAnZWFzZU91dEN1YmljJyxcclxuICAgIGVhc2VJbk91dDogJ2Vhc2VJbk91dEN1YmljJ1xyXG59O1xyXG5cclxuXHJcbnZhciBQYXRoID0gZnVuY3Rpb24gUGF0aChwYXRoLCBvcHRzKSB7XHJcbiAgICAvLyBEZWZhdWx0IHBhcmFtZXRlcnMgZm9yIGFuaW1hdGlvblxyXG4gICAgb3B0cyA9IHV0aWxzLmV4dGVuZCh7XHJcbiAgICAgICAgZHVyYXRpb246IDgwMCxcclxuICAgICAgICBlYXNpbmc6ICdsaW5lYXInLFxyXG4gICAgICAgIGZyb206IHt9LFxyXG4gICAgICAgIHRvOiB7fSxcclxuICAgICAgICBzdGVwOiBmdW5jdGlvbigpIHt9XHJcbiAgICB9LCBvcHRzKTtcclxuXHJcbiAgICB2YXIgZWxlbWVudDtcclxuICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhdGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtZW50ID0gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXZlYWwgLnBhdGggYXMgcHVibGljIGF0dHJpYnV0ZVxyXG4gICAgdGhpcy5wYXRoID0gZWxlbWVudDtcclxuICAgIHRoaXMuX29wdHMgPSBvcHRzO1xyXG4gICAgdGhpcy5fdHdlZW5hYmxlID0gbnVsbDtcclxuXHJcbiAgICAvLyBTZXQgdXAgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uc1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMucGF0aC5nZXRUb3RhbExlbmd0aCgpO1xyXG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGxlbmd0aCArICcgJyArIGxlbmd0aDtcclxuICAgIHRoaXMuc2V0KDApO1xyXG59O1xyXG5cclxuUGF0aC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcclxuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRDb21wdXRlZERhc2hPZmZzZXQoKTtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLnBhdGguZ2V0VG90YWxMZW5ndGgoKTtcclxuXHJcbiAgICB2YXIgcHJvZ3Jlc3MgPSAxIC0gb2Zmc2V0IC8gbGVuZ3RoO1xyXG4gICAgLy8gUm91bmQgbnVtYmVyIHRvIHByZXZlbnQgcmV0dXJuaW5nIHZlcnkgc21hbGwgbnVtYmVyIGxpa2UgMWUtMzAsIHdoaWNoXHJcbiAgICAvLyBpcyBwcmFjdGljYWxseSAwXHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChwcm9ncmVzcy50b0ZpeGVkKDYpLCAxMCk7XHJcbn07XHJcblxyXG5QYXRoLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQocHJvZ3Jlc3MpIHtcclxuICAgIHRoaXMuc3RvcCgpO1xyXG5cclxuICAgIHRoaXMucGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gdGhpcy5fcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcyk7XHJcblxyXG4gICAgdmFyIHN0ZXAgPSB0aGlzLl9vcHRzLnN0ZXA7XHJcbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihzdGVwKSkge1xyXG4gICAgICAgIHZhciBlYXNpbmcgPSB0aGlzLl9lYXNpbmcodGhpcy5fb3B0cy5lYXNpbmcpO1xyXG4gICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLl9jYWxjdWxhdGVUbyhwcm9ncmVzcywgZWFzaW5nKTtcclxuICAgICAgICBzdGVwKHZhbHVlcywgdGhpcy5fb3B0cy5zaGFwZXx8dGhpcywgdGhpcy5fb3B0cy5hdHRhY2htZW50KTtcclxuICAgIH1cclxufTtcclxuXHJcblBhdGgucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiBzdG9wKCkge1xyXG4gICAgdGhpcy5fc3RvcFR3ZWVuKCk7XHJcbiAgICB0aGlzLnBhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHRoaXMuX2dldENvbXB1dGVkRGFzaE9mZnNldCgpO1xyXG59O1xyXG5cclxuLy8gTWV0aG9kIGludHJvZHVjZWQgaGVyZTpcclxuLy8gaHR0cDovL2pha2VhcmNoaWJhbGQuY29tLzIwMTMvYW5pbWF0ZWQtbGluZS1kcmF3aW5nLXN2Zy9cclxuUGF0aC5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUocHJvZ3Jlc3MsIG9wdHMsIGNiKSB7XHJcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcclxuXHJcbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihvcHRzKSkge1xyXG4gICAgICAgIGNiID0gb3B0cztcclxuICAgICAgICBvcHRzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhc3NlZE9wdHMgPSB1dGlscy5leHRlbmQoe30sIG9wdHMpO1xyXG5cclxuICAgIC8vIENvcHkgZGVmYXVsdCBvcHRzIHRvIG5ldyBvYmplY3Qgc28gZGVmYXVsdHMgYXJlIG5vdCBtb2RpZmllZFxyXG4gICAgdmFyIGRlZmF1bHRPcHRzID0gdXRpbHMuZXh0ZW5kKHt9LCB0aGlzLl9vcHRzKTtcclxuICAgIG9wdHMgPSB1dGlscy5leHRlbmQoZGVmYXVsdE9wdHMsIG9wdHMpO1xyXG5cclxuICAgIHZhciBzaGlmdHlFYXNpbmcgPSB0aGlzLl9lYXNpbmcob3B0cy5lYXNpbmcpO1xyXG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3Jlc29sdmVGcm9tQW5kVG8ocHJvZ3Jlc3MsIHNoaWZ0eUVhc2luZywgcGFzc2VkT3B0cyk7XHJcblxyXG4gICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciBhIGxheW91dCBzbyBzdHlsZXMgYXJlIGNhbGN1bGF0ZWQgJiB0aGUgYnJvd3NlclxyXG4gICAgLy8gcGlja3MgdXAgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIGJlZm9yZSBhbmltYXRpbmdcclxuICAgIHRoaXMucGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0KCk7XHJcbiAgICB2YXIgbmV3T2Zmc2V0ID0gdGhpcy5fcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcyk7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5fdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xyXG4gICAgdGhpcy5fdHdlZW5hYmxlLnR3ZWVuKHtcclxuICAgICAgICBmcm9tOiB1dGlscy5leHRlbmQoeyBvZmZzZXQ6IG9mZnNldCB9LCB2YWx1ZXMuZnJvbSksXHJcbiAgICAgICAgdG86IHV0aWxzLmV4dGVuZCh7IG9mZnNldDogbmV3T2Zmc2V0IH0sIHZhbHVlcy50byksXHJcbiAgICAgICAgZHVyYXRpb246IG9wdHMuZHVyYXRpb24sXHJcbiAgICAgICAgZWFzaW5nOiBzaGlmdHlFYXNpbmcsXHJcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oc3RhdGUpIHtcclxuICAgICAgICAgICAgc2VsZi5wYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBzdGF0ZS5vZmZzZXQ7XHJcbiAgICAgICAgICAgIG9wdHMuc3RlcChzdGF0ZSwgb3B0cy5zaGFwZXx8c2VsZiwgb3B0cy5hdHRhY2htZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbmlzaDogZnVuY3Rpb24oc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oY2IpKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5QYXRoLnByb3RvdHlwZS5fZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkRGFzaE9mZnNldCgpIHtcclxuICAgIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5wYXRoLCBudWxsKTtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnc3Ryb2tlLWRhc2hvZmZzZXQnKSwgMTApO1xyXG59O1xyXG5cclxuUGF0aC5wcm90b3R5cGUuX3Byb2dyZXNzVG9PZmZzZXQgPSBmdW5jdGlvbiBfcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcykge1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMucGF0aC5nZXRUb3RhbExlbmd0aCgpO1xyXG4gICAgcmV0dXJuIGxlbmd0aCAtIHByb2dyZXNzICogbGVuZ3RoO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgZnJvbSBhbmQgdG8gdmFsdWVzIGZvciBhbmltYXRpb24uXHJcblBhdGgucHJvdG90eXBlLl9yZXNvbHZlRnJvbUFuZFRvID0gZnVuY3Rpb24gX3Jlc29sdmVGcm9tQW5kVG8ocHJvZ3Jlc3MsIGVhc2luZywgb3B0cykge1xyXG4gICAgaWYgKG9wdHMuZnJvbSAmJiBvcHRzLnRvKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZnJvbTogb3B0cy5mcm9tLFxyXG4gICAgICAgICAgICB0bzogb3B0cy50b1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBmcm9tOiB0aGlzLl9jYWxjdWxhdGVGcm9tKGVhc2luZyksXHJcbiAgICAgICAgdG86IHRoaXMuX2NhbGN1bGF0ZVRvKHByb2dyZXNzLCBlYXNpbmcpXHJcbiAgICB9O1xyXG59O1xyXG5cclxuLy8gQ2FsY3VsYXRlIGBmcm9tYCB2YWx1ZXMgZnJvbSBvcHRpb25zIHBhc3NlZCBhdCBpbml0aWFsaXphdGlvblxyXG5QYXRoLnByb3RvdHlwZS5fY2FsY3VsYXRlRnJvbSA9IGZ1bmN0aW9uIF9jYWxjdWxhdGVGcm9tKGVhc2luZykge1xyXG4gICAgcmV0dXJuIFR3ZWVuYWJsZS5pbnRlcnBvbGF0ZSh0aGlzLl9vcHRzLmZyb20sIHRoaXMuX29wdHMudG8sIHRoaXMudmFsdWUoKSwgZWFzaW5nKTtcclxufTtcclxuXHJcbi8vIENhbGN1bGF0ZSBgdG9gIHZhbHVlcyBmcm9tIG9wdGlvbnMgcGFzc2VkIGF0IGluaXRpYWxpemF0aW9uXHJcblBhdGgucHJvdG90eXBlLl9jYWxjdWxhdGVUbyA9IGZ1bmN0aW9uIF9jYWxjdWxhdGVUbyhwcm9ncmVzcywgZWFzaW5nKSB7XHJcbiAgICByZXR1cm4gVHdlZW5hYmxlLmludGVycG9sYXRlKHRoaXMuX29wdHMuZnJvbSwgdGhpcy5fb3B0cy50bywgcHJvZ3Jlc3MsIGVhc2luZyk7XHJcbn07XHJcblxyXG5QYXRoLnByb3RvdHlwZS5fc3RvcFR3ZWVuID0gZnVuY3Rpb24gX3N0b3BUd2VlbigpIHtcclxuICAgIGlmICh0aGlzLl90d2VlbmFibGUgIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLl90d2VlbmFibGUuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuYWJsZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fdHdlZW5hYmxlID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcblBhdGgucHJvdG90eXBlLl9lYXNpbmcgPSBmdW5jdGlvbiBfZWFzaW5nKGVhc2luZykge1xyXG4gICAgaWYgKEVBU0lOR19BTElBU0VTLmhhc093blByb3BlcnR5KGVhc2luZykpIHtcclxuICAgICAgICByZXR1cm4gRUFTSU5HX0FMSUFTRVNbZWFzaW5nXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWFzaW5nO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXRoO1xyXG4iLCIvLyBCYXNlIG9iamVjdCBmb3IgZGlmZmVyZW50IHByb2dyZXNzIGJhciBzaGFwZXNcclxuXHJcbnZhciBQYXRoID0gcmVxdWlyZSgnLi9wYXRoJyk7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuXHJcbnZhciBERVNUUk9ZRURfRVJST1IgPSAnT2JqZWN0IGlzIGRlc3Ryb3llZCc7XHJcblxyXG5cclxudmFyIFNoYXBlID0gZnVuY3Rpb24gU2hhcGUoY29udGFpbmVyLCBvcHRzKSB7XHJcbiAgICAvLyBUaHJvdyBhIGJldHRlciBlcnJvciBpZiBwcm9ncmVzcyBiYXJzIGFyZSBub3QgaW5pdGlhbGl6ZWQgd2l0aCBgbmV3YFxyXG4gICAgLy8ga2V5d29yZFxyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNoYXBlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uc3RydWN0b3Igd2FzIGNhbGxlZCB3aXRob3V0IG5ldyBrZXl3b3JkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJldmVudCBjYWxsaW5nIGNvbnN0cnVjdG9yIHdpdGhvdXQgcGFyYW1ldGVycyBzbyBpbmhlcml0YW5jZVxyXG4gICAgLy8gd29ya3MgY29ycmVjdGx5LiBUbyB1bmRlcnN0YW5kLCB0aGlzIGlzIGhvdyBTaGFwZSBpcyBpbmhlcml0ZWQ6XHJcbiAgICAvL1xyXG4gICAgLy8gICBMaW5lLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xyXG4gICAgLy9cclxuICAgIC8vIFdlIGp1c3Qgd2FudCB0byBzZXQgdGhlIHByb3RvdHlwZSBmb3IgTGluZS5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgLy8gRGVmYXVsdCBwYXJhbWV0ZXJzIGZvciBwcm9ncmVzcyBiYXIgY3JlYXRpb25cclxuICAgIHRoaXMuX29wdHMgPSB1dGlscy5leHRlbmQoe1xyXG4gICAgICAgIGNvbG9yOiAnIzU1NScsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEuMCxcclxuICAgICAgICB0cmFpbENvbG9yOiBudWxsLFxyXG4gICAgICAgIHRyYWlsV2lkdGg6IG51bGwsXHJcbiAgICAgICAgZmlsbDogbnVsbCxcclxuICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGF1dG9TdHlsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sb3I6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAncHJvZ3Jlc3NiYXItdGV4dCdcclxuICAgICAgICB9XHJcbiAgICB9LCBvcHRzLCB0cnVlKTsgIC8vIFVzZSByZWN1cnNpdmUgZXh0ZW5kXHJcblxyXG4gICAgdmFyIHN2Z1ZpZXcgPSB0aGlzLl9jcmVhdGVTdmdWaWV3KHRoaXMuX29wdHMpO1xyXG5cclxuICAgIHZhciBlbGVtZW50O1xyXG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKGNvbnRhaW5lcikpIHtcclxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGRvZXMgbm90IGV4aXN0OiAnICsgY29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1ZpZXcuc3ZnKTtcclxuXHJcbiAgICB0aGlzLnRleHQgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuX29wdHMudGV4dC52YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuX2NyZWF0ZVRleHRFbGVtZW50KHRoaXMuX29wdHMsIHRoaXMuX2NvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXhwb3NlIHB1YmxpYyBhdHRyaWJ1dGVzIGJlZm9yZSBQYXRoIGluaXRpYWxpemF0aW9uXHJcbiAgICB0aGlzLnN2ZyA9IHN2Z1ZpZXcuc3ZnO1xyXG4gICAgdGhpcy5wYXRoID0gc3ZnVmlldy5wYXRoO1xyXG4gICAgdGhpcy50cmFpbCA9IHN2Z1ZpZXcudHJhaWw7XHJcbiAgICAvLyB0aGlzLnRleHQgaXMgYWxzbyBhIHB1YmxpYyBhdHRyaWJ1dGVcclxuXHJcbiAgICB2YXIgbmV3T3B0cyA9IHV0aWxzLmV4dGVuZCh7XHJcbiAgICAgICAgYXR0YWNobWVudDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHNoYXBlOiB0aGlzXHJcbiAgICB9LCB0aGlzLl9vcHRzKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aCA9IG5ldyBQYXRoKHN2Z1ZpZXcucGF0aCwgbmV3T3B0cyk7XHJcbn07XHJcblxyXG5TaGFwZS5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUocHJvZ3Jlc3MsIG9wdHMsIGNiKSB7XHJcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aC5hbmltYXRlKHByb2dyZXNzLCBvcHRzLCBjYik7XHJcbn07XHJcblxyXG5TaGFwZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIHN0b3AoKSB7XHJcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcclxuICAgIC8vIERvbid0IGNyYXNoIGlmIHN0b3AgaXMgY2FsbGVkIGluc2lkZSBzdGVwIGZ1bmN0aW9uXHJcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLl9wcm9ncmVzc1BhdGguc3RvcCgpO1xyXG59O1xyXG5cclxuU2hhcGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKERFU1RST1lFRF9FUlJPUik7XHJcblxyXG4gICAgdGhpcy5zdG9wKCk7XHJcbiAgICB0aGlzLnN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3ZnKTtcclxuICAgIHRoaXMuc3ZnID0gbnVsbDtcclxuICAgIHRoaXMucGF0aCA9IG51bGw7XHJcbiAgICB0aGlzLnRyYWlsID0gbnVsbDtcclxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudGV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMudGV4dCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQocHJvZ3Jlc3MpIHtcclxuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoLnNldChwcm9ncmVzcyk7XHJcbn07XHJcblxyXG5TaGFwZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcclxuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xyXG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3NQYXRoLnZhbHVlKCk7XHJcbn07XHJcblxyXG5TaGFwZS5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uIHNldFRleHQodGV4dCkge1xyXG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKERFU1RST1lFRF9FUlJPUik7XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dCA9PT0gbnVsbCkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBuZXcgdGV4dCBub2RlXHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5fY3JlYXRlVGV4dEVsZW1lbnQodGhpcy5fb3B0cywgdGhpcy5fY29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgcHJldmlvdXMgdGV4dCBub2RlIGFuZCBhZGQgbmV3XHJcbiAgICB0aGlzLnRleHQucmVtb3ZlQ2hpbGQodGhpcy50ZXh0LmZpcnN0Q2hpbGQpO1xyXG4gICAgdGhpcy50ZXh0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlU3ZnVmlldyA9IGZ1bmN0aW9uIF9jcmVhdGVTdmdWaWV3KG9wdHMpIHtcclxuICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xyXG4gICAgdGhpcy5faW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpO1xyXG5cclxuICAgIHZhciB0cmFpbFBhdGggPSBudWxsO1xyXG4gICAgLy8gRWFjaCBvcHRpb24gbGlzdGVkIGluIHRoZSBpZiBjb25kaXRpb24gYXJlICd0cmlnZ2VycycgZm9yIGNyZWF0aW5nXHJcbiAgICAvLyB0aGUgdHJhaWwgcGF0aFxyXG4gICAgaWYgKG9wdHMudHJhaWxDb2xvciB8fCBvcHRzLnRyYWlsV2lkdGgpIHtcclxuICAgICAgICB0cmFpbFBhdGggPSB0aGlzLl9jcmVhdGVUcmFpbChvcHRzKTtcclxuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQodHJhaWxQYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGF0aCA9IHRoaXMuX2NyZWF0ZVBhdGgob3B0cyk7XHJcbiAgICBzdmcuYXBwZW5kQ2hpbGQocGF0aCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdmc6IHN2ZyxcclxuICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgIHRyYWlsOiB0cmFpbFBhdGhcclxuICAgIH07XHJcbn07XHJcblxyXG5TaGFwZS5wcm90b3R5cGUuX2luaXRpYWxpemVTdmcgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpIHtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIF9jcmVhdGVQYXRoKG9wdHMpIHtcclxuICAgIHZhciBwYXRoU3RyaW5nID0gdGhpcy5fcGF0aFN0cmluZyhvcHRzKTtcclxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBvcHRzKTtcclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlVHJhaWwgPSBmdW5jdGlvbiBfY3JlYXRlVHJhaWwob3B0cykge1xyXG4gICAgLy8gQ3JlYXRlIHBhdGggc3RyaW5nIHdpdGggb3JpZ2luYWwgcGFzc2VkIG9wdGlvbnNcclxuICAgIHZhciBwYXRoU3RyaW5nID0gdGhpcy5fdHJhaWxTdHJpbmcob3B0cyk7XHJcblxyXG4gICAgLy8gUHJldmVudCBtb2RpZnlpbmcgb3JpZ2luYWxcclxuICAgIHZhciBuZXdPcHRzID0gdXRpbHMuZXh0ZW5kKHt9LCBvcHRzKTtcclxuXHJcbiAgICAvLyBEZWZhdWx0cyBmb3IgcGFyYW1ldGVycyB3aGljaCBtb2RpZnkgdHJhaWwgcGF0aFxyXG4gICAgaWYgKCFuZXdPcHRzLnRyYWlsQ29sb3IpIG5ld09wdHMudHJhaWxDb2xvciA9ICcjZWVlJztcclxuICAgIGlmICghbmV3T3B0cy50cmFpbFdpZHRoKSBuZXdPcHRzLnRyYWlsV2lkdGggPSBuZXdPcHRzLnN0cm9rZVdpZHRoO1xyXG5cclxuICAgIG5ld09wdHMuY29sb3IgPSBuZXdPcHRzLnRyYWlsQ29sb3I7XHJcbiAgICBuZXdPcHRzLnN0cm9rZVdpZHRoID0gbmV3T3B0cy50cmFpbFdpZHRoO1xyXG5cclxuICAgIC8vIFdoZW4gdHJhaWwgcGF0aCBpcyBzZXQsIGZpbGwgbXVzdCBiZSBzZXQgZm9yIGl0IGluc3RlYWQgb2YgdGhlXHJcbiAgICAvLyBhY3R1YWwgcGF0aCB0byBwcmV2ZW50IHRyYWlsIHN0cm9rZSBmcm9tIGNsaXBwaW5nXHJcbiAgICBuZXdPcHRzLmZpbGwgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBuZXdPcHRzKTtcclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlUGF0aEVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlUGF0aEVsZW1lbnQocGF0aFN0cmluZywgb3B0cykge1xyXG4gICAgdmFyIHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BhdGgnKTtcclxuICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgcGF0aFN0cmluZyk7XHJcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgb3B0cy5jb2xvcik7XHJcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgb3B0cy5zdHJva2VXaWR0aCk7XHJcblxyXG4gICAgaWYgKG9wdHMuZmlsbCkge1xyXG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgb3B0cy5maWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn07XHJcblxyXG5TaGFwZS5wcm90b3R5cGUuX2NyZWF0ZVRleHRFbGVtZW50ID0gZnVuY3Rpb24gX2NyZWF0ZVRleHRFbGVtZW50KG9wdHMsIGNvbnRhaW5lcikge1xyXG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG9wdHMudGV4dC52YWx1ZSkpO1xyXG5cclxuICAgIGlmIChvcHRzLnRleHQuYXV0b1N0eWxlKSB7XHJcbiAgICAgICAgLy8gQ2VudGVyIHRleHRcclxuICAgICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gJzUwJSc7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJzUwJSc7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nID0gMDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLm1hcmdpbiA9IDA7XHJcbiAgICAgICAgdXRpbHMuc2V0U3R5bGUoZWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdHMudGV4dC5jb2xvcikge1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gb3B0cy50ZXh0LmNvbG9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBvcHRzLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gb3B0cy50ZXh0LmNsYXNzTmFtZTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IGZ1bmN0aW9uIF9wYXRoU3RyaW5nKG9wdHMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignT3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiBmb3IgZWFjaCBwcm9ncmVzcyBiYXInKTtcclxufTtcclxuXHJcblNoYXBlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIGZvciBlYWNoIHByb2dyZXNzIGJhcicpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZTtcclxuIiwiLy8gU3F1YXJlIHNoYXBlZCBwcm9ncmVzcyBiYXJcclxuXHJcbnZhciBTaGFwZSA9IHJlcXVpcmUoJy4vc2hhcGUnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxuXHJcbnZhciBTcXVhcmUgPSBmdW5jdGlvbiBTcXVhcmUoY29udGFpbmVyLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPVxyXG4gICAgICAgICdNIDAse2hhbGZPZlN0cm9rZVdpZHRofScgK1xyXG4gICAgICAgICcgTCB7d2lkdGh9LHtoYWxmT2ZTdHJva2VXaWR0aH0nICtcclxuICAgICAgICAnIEwge3dpZHRofSx7d2lkdGh9JyArXHJcbiAgICAgICAgJyBMIHtoYWxmT2ZTdHJva2VXaWR0aH0se3dpZHRofScgK1xyXG4gICAgICAgICcgTCB7aGFsZk9mU3Ryb2tlV2lkdGh9LHtzdHJva2VXaWR0aH0nO1xyXG5cclxuICAgIHRoaXMuX3RyYWlsVGVtcGxhdGUgPVxyXG4gICAgICAgICdNIHtzdGFydE1hcmdpbn0se2hhbGZPZlN0cm9rZVdpZHRofScgK1xyXG4gICAgICAgICcgTCB7d2lkdGh9LHtoYWxmT2ZTdHJva2VXaWR0aH0nICtcclxuICAgICAgICAnIEwge3dpZHRofSx7d2lkdGh9JyArXHJcbiAgICAgICAgJyBMIHtoYWxmT2ZTdHJva2VXaWR0aH0se3dpZHRofScgK1xyXG4gICAgICAgICcgTCB7aGFsZk9mU3Ryb2tlV2lkdGh9LHtoYWxmT2ZTdHJva2VXaWR0aH0nO1xyXG5cclxuICAgIFNoYXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5TcXVhcmUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XHJcblNxdWFyZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTcXVhcmU7XHJcblxyXG5TcXVhcmUucHJvdG90eXBlLl9wYXRoU3RyaW5nID0gZnVuY3Rpb24gX3BhdGhTdHJpbmcob3B0cykge1xyXG4gICAgdmFyIHcgPSAxMDAgLSBvcHRzLnN0cm9rZVdpZHRoIC8gMjtcclxuXHJcbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3BhdGhUZW1wbGF0ZSwge1xyXG4gICAgICAgIHdpZHRoOiB3LFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoLFxyXG4gICAgICAgIGhhbGZPZlN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoIC8gMlxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5TcXVhcmUucHJvdG90eXBlLl90cmFpbFN0cmluZyA9IGZ1bmN0aW9uIF90cmFpbFN0cmluZyhvcHRzKSB7XHJcbiAgICB2YXIgdyA9IDEwMCAtIG9wdHMuc3Ryb2tlV2lkdGggLyAyO1xyXG5cclxuICAgIHJldHVybiB1dGlscy5yZW5kZXIodGhpcy5fdHJhaWxUZW1wbGF0ZSwge1xyXG4gICAgICAgIHdpZHRoOiB3LFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoLFxyXG4gICAgICAgIGhhbGZPZlN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoIC8gMixcclxuICAgICAgICBzdGFydE1hcmdpbjogKG9wdHMuc3Ryb2tlV2lkdGggLyAyKSAtIChvcHRzLnRyYWlsV2lkdGggLyAyKVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNxdWFyZTtcclxuIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnNcclxuXHJcbnZhciBQUkVGSVhFUyA9ICdXZWJraXQgTW96IE8gbXMnLnNwbGl0KCcgJyk7XHJcblxyXG4vLyBDb3B5IGFsbCBhdHRyaWJ1dGVzIGZyb20gc291cmNlIG9iamVjdCB0byBkZXN0aW5hdGlvbiBvYmplY3QuXHJcbi8vIGRlc3RpbmF0aW9uIG9iamVjdCBpcyBtdXRhdGVkLlxyXG5mdW5jdGlvbiBleHRlbmQoZGVzdGluYXRpb24sIHNvdXJjZSwgcmVjdXJzaXZlKSB7XHJcbiAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uIHx8IHt9O1xyXG4gICAgc291cmNlID0gc291cmNlIHx8IHt9O1xyXG4gICAgcmVjdXJzaXZlID0gcmVjdXJzaXZlIHx8IGZhbHNlO1xyXG5cclxuICAgIGZvciAodmFyIGF0dHJOYW1lIGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKSB7XHJcbiAgICAgICAgICAgIHZhciBkZXN0VmFsID0gZGVzdGluYXRpb25bYXR0ck5hbWVdO1xyXG4gICAgICAgICAgICB2YXIgc291cmNlVmFsID0gc291cmNlW2F0dHJOYW1lXTtcclxuICAgICAgICAgICAgaWYgKHJlY3Vyc2l2ZSAmJiBpc09iamVjdChkZXN0VmFsKSAmJiBpc09iamVjdChzb3VyY2VWYWwpKSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblthdHRyTmFtZV0gPSBleHRlbmQoZGVzdFZhbCwgc291cmNlVmFsLCByZWN1cnNpdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bYXR0ck5hbWVdID0gc291cmNlVmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxufVxyXG5cclxuLy8gUmVuZGVycyB0ZW1wbGF0ZXMgd2l0aCBnaXZlbiB2YXJpYWJsZXMuIFZhcmlhYmxlcyBtdXN0IGJlIHN1cnJvdW5kZWQgd2l0aFxyXG4vLyBicmFjZXMgd2l0aG91dCBhbnkgc3BhY2VzLCBlLmcuIHt2YXJpYWJsZX1cclxuLy8gQWxsIGluc3RhbmNlcyBvZiB2YXJpYWJsZSBwbGFjZWhvbGRlcnMgd2lsbCBiZSByZXBsYWNlZCB3aXRoIGdpdmVuIGNvbnRlbnRcclxuLy8gRXhhbXBsZTpcclxuLy8gcmVuZGVyKCdIZWxsbywge21lc3NhZ2V9IScsIHttZXNzYWdlOiAnd29ybGQnfSlcclxuZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2YXJzKSB7XHJcbiAgICB2YXIgcmVuZGVyZWQgPSB0ZW1wbGF0ZTtcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdmFycykge1xyXG4gICAgICAgIGlmICh2YXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgdmFyIHZhbCA9IHZhcnNba2V5XTtcclxuICAgICAgICAgICAgdmFyIHJlZ0V4cFN0cmluZyA9ICdcXFxceycgKyBrZXkgKyAnXFxcXH0nO1xyXG4gICAgICAgICAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChyZWdFeHBTdHJpbmcsICdnJyk7XHJcblxyXG4gICAgICAgICAgICByZW5kZXJlZCA9IHJlbmRlcmVkLnJlcGxhY2UocmVnRXhwLCB2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVuZGVyZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlLCB2YWx1ZSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBQUkVGSVhFUy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBwcmVmaXggPSBQUkVGSVhFU1tpXTtcclxuICAgICAgICBlbGVtZW50LnN0eWxlW3ByZWZpeCArIGNhcGl0YWxpemUoc3R5bGUpXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuc3R5bGVbc3R5bGVdID0gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcGl0YWxpemUodGV4dCkge1xyXG4gICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcclxuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5cclxuZnVuY3Rpb24gaXNBcnJheShvYmopIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxufVxyXG5cclxuLy8gUmV0dXJucyB0cnVlIGlmIGBvYmpgIGlzIG9iamVjdCBhcyBpbiB7YTogMSwgYjogMn0sIG5vdCBpZiBpdCdzIGZ1bmN0aW9uIG9yXHJcbi8vIGFycmF5XHJcbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xyXG4gICAgaWYgKGlzQXJyYXkob2JqKSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcclxuICAgIHJldHVybiB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZXh0ZW5kOiBleHRlbmQsXHJcbiAgICByZW5kZXI6IHJlbmRlcixcclxuICAgIHNldFN0eWxlOiBzZXRTdHlsZSxcclxuICAgIGNhcGl0YWxpemU6IGNhcGl0YWxpemUsXHJcbiAgICBpc1N0cmluZzogaXNTdHJpbmcsXHJcbiAgICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxyXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0XHJcbn07XHJcbiJdfQ==
