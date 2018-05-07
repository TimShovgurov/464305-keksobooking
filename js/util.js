'use strict';
(function () {
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomIndexFromArrray = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    escEvent: ESC_KEYCODE,
    enterEvent: ENTER_KEYCODE,
    getRandomIndexFromArrray: getRandomIndexFromArrray,
    getRandomInRange: getRandomInRange
  };
})();
