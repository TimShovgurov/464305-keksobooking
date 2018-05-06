'use strict';
(function () {
  var LIMIT_TOP_Y = 150;
  var LIMIT_BOTTOM_Y = 500;
  var LIMIT_LEFT_X = 0;
  var LIMIT_RIGHT_X = 1200;
  var MAIN_PIN_WIDTH = 30;
  var MAIN_PIN_HEIGHT = 80;
  var addressPin = document.getElementById('address');
  var onPinMove = document.querySelector('.map__pin--main');
  var inputActive = document.querySelectorAll('fieldset');
  var cityMapActive = document.querySelector('.map');
  var formActive = document.querySelector('.ad-form');

  // активирование формы
  onPinMove.addEventListener('mouseup', function () {
    cityMapActive.classList.remove('map--faded');
    formActive.classList.remove('ad-form--disabled');
    for (var i = 0; i < inputActive.length; i++) {
      inputActive[i].removeAttribute('disabled');
      var newAddressLeft = onPinMove.offsetLeft - MAIN_PIN_WIDTH / 2;
      var newAddressTop = onPinMove.offsetTop + MAIN_PIN_HEIGHT / 2;
      addressPin.setAttribute('value', newAddressLeft + ', ' + newAddressTop);
    }
    window.data.renderPins(window.data.objectArray);
  });

  // передвижение метки
  onPinMove.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      onPinMove.style.top = (onPinMove.offsetTop - shift.y) + 'px';
      onPinMove.style.left = (onPinMove.offsetLeft - shift.x) + 'px';

      var onPinMoveLeftCoord = parseInt(onPinMove.style.left.split('px')[0], 10);
      var onPinMoveTopCoord = parseInt(onPinMove.style.top.split('px')[0], 10);

      if (onPinMoveTopCoord < LIMIT_TOP_Y - MAIN_PIN_HEIGHT) {
        onPinMove.style.top = LIMIT_TOP_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (onPinMoveTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT) {
        onPinMove.style.top = LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (onPinMoveLeftCoord < LIMIT_LEFT_X - MAIN_PIN_WIDTH) {
        onPinMove.style.left = LIMIT_LEFT_X - MAIN_PIN_WIDTH + 'px';
      }

      if (onPinMoveLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_WIDTH) {
        onPinMove.style.left = LIMIT_RIGHT_X - MAIN_PIN_WIDTH + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
