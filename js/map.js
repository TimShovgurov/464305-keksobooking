'use strict';
var LIMIT_TOP_Y = 150;
var LIMIT_BOTTOM_Y = 500;
var LIMIT_LEFT_X = 0;
var LIMIT_RIGHT_X = 1200;
var MAIN_PIN_WIDTH = 30;
var MAIN_PIN_HEIGHT = 80;
var ADVERTS_COUNT = 8;
var ESC_KEYCODE = 27;
var typeMas = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getTitle = function (index) {
  var houseTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  return houseTitles[index];
};

var getAvatar = function (index) {
  return 'img/avatars/user0' + index + '.png';
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomIndexFromArrray = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomPhotos = function (arr) {
  var j = 0;
  var x = 0;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

var newDomObject = function (objectCount) {
  var objectMas = [];
  for (var i = 0; i < objectCount; i++) {
    var locationX = getRandomInRange(300, 900);
    var locationY = getRandomInRange(150, 500);
    objectMas[i] = {
      'author': {
        'avatar': getAvatar(i + 1)
      },

      'offer': {
        'title': getTitle(i + 1),
        'address': locationX + ', ' + locationY,
        'price': getRandomInRange(1000, 1000000),
        'type': getRandomIndexFromArrray(typeMas),
        'rooms': getRandomInRange(1, 5),
        'guests': getRandomInRange(1, 10),
        'checkin': getRandomIndexFromArrray(checkinTime),
        'checkout': getRandomIndexFromArrray(checkoutTime),
        'features': getRandomIndexFromArrray(featuresMas),
        'description': ' ',
        'photos': getRandomPhotos(photosMas)
      },

      'location': {
        'x': getRandomInRange(300, 900),
        'y': getRandomInRange(150, 500),
      },
    };
  } return objectMas;
};

var objectArray = newDomObject(ADVERTS_COUNT);

var renderPins = function (objectivMas) {
  var template = document.querySelector('.map__pins');
  var similarElement = document.querySelector('template')
      .content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  objectivMas.forEach(function (item, index) {
    var element = similarElement.cloneNode(true);
    element.querySelector('img').setAttribute('src', item.author.avatar);
    element.setAttribute('style', 'left: ' + item.location.x + 'px; '
    + 'top:' + item.location.y + 'px');
    element.setAttribute('data-about', index);
    fragment.appendChild(element);
    template.appendChild(fragment);
  });
};

var renderFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + features[i];
    fragment.appendChild(newElement);
  }
  return fragment;
};

var renderPictures = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= photos.length - 1; i++) {
    var similarElement = document.querySelector('template').content.querySelector('.popup__photos').cloneNode(true);
    similarElement.querySelector('img').setAttribute('src', photos[i]);
    similarElement.querySelector('img').setAttribute('height', 60);
    similarElement.querySelector('img').setAttribute('width', 60);
    fragment.appendChild(similarElement);
  }
  return fragment;
};

var renderPopUp = function (item) {
  var similarCardTemplate = document.querySelector('template')
      .content
      .querySelector('.map__card');
  if (item) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__avatar').alt = item.offer.title;
    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeMas[item.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для '
  + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до '
  + item.offer.checkout;
    cardElement.querySelector('.popup__photos').textContent = '';
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(renderPictures(item.offer.photos));
  }
  return cardElement;
};

var addressPin = document.getElementById('address');
var onPinMove = document.querySelector('.map__pin--main');
var inputActive = document.querySelectorAll('fieldset');
var cityMapActive = document.querySelector('.map');
var formActive = document.querySelector('.ad-form');

onPinMove.addEventListener('mouseup', function () {
  cityMapActive.classList.remove('map--faded');
  formActive.classList.remove('ad-form--disabled');
  for (var i = 0; i < inputActive.length; i++) {
    inputActive[i].removeAttribute('disabled');
    var newAddressLeft = onPinMove.offsetLeft - MAIN_PIN_WIDTH / 2;
    var newAddressTop = onPinMove.offsetTop + MAIN_PIN_HEIGHT / 2;
    addressPin.setAttribute('value', newAddressLeft + ', ' + newAddressTop);
  }
  renderPins(objectArray);
});

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
var removeDialogPanel = function () {
  var article = document.querySelector('.map__card');
  if (article) {
    article.parentNode.removeChild(article);
  }
};
var mapContainer = document.querySelector('.map__filters-container');
var mapsPins = document.querySelector('.map__pins');
mapsPins.addEventListener('click', function (e) {
  e.preventDefault();
  var activePin = e.target;
  if (activePin.tagName === 'IMG') {
    removeDialogPanel();
    activePin = activePin.parentElement;
  }
  if (activePin.dataset.about !== void 0) {
    var cardFragment = document.createDocumentFragment();
    var activePinIndex = activePin.dataset.about;
    cardFragment = renderPopUp(objectArray[activePinIndex]);
    mapContainer.insertAdjacentElement('beforeBegin', cardFragment);
  }
  var popUpCard = document.querySelector('.map__card');
  document.addEventListener('click', function (evt) {
    if (evt) {
      evt.preventDefault();
      var activeButton = evt.target.parentNode;
      var activedButton = evt.target;
      if (activedButton.tagName === 'BUTTON') {
        if (activeButton.tagName === 'ARTICLE') {
          popUpCard.remove();
        // activeButton.parentNode.removeChild(activeButton);
        }
      }
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popUpCard.remove();
    }
  });
});

var appartmentPrice = document.getElementById('price');
var selectType = document.getElementById('type');

var setMinPrice = function () {
  if (selectType.value === 'bungalo') {
    appartmentPrice.min = 0;
    appartmentPrice.placeholder = 0;
  }
  if (selectType.value === 'flat') {
    appartmentPrice.min = 1000;
    appartmentPrice.placeholder = 1000;
  }
  if (selectType.value === 'house') {
    appartmentPrice.min = 5000;
    appartmentPrice.placeholder = 5000;
  }
  if (selectType.value === 'palace') {
    appartmentPrice.min = 10000;
    appartmentPrice.placeholder = 10000;
  }
};
setMinPrice();
selectType.addEventListener('change', setMinPrice);

document.getElementById('timein').addEventListener('change', function () {
  var selectTimeIn = document.getElementById('timein');
  var selectedTimeIn = selectTimeIn.options[selectTimeIn.selectedIndex].value;

  var forRemoveOut = document.getElementById('timeout').querySelector('option[selected]');
  forRemoveOut.removeAttribute('selected');

  var addSelectedOut = document.getElementById('timeout').querySelector('option[value="' + selectedTimeIn + '"]');
  addSelectedOut.setAttribute('selected', 'selected');
});

document.getElementById('timeout').addEventListener('change', function () {
  var selectTimeOut = document.getElementById('timeout');
  var selectedTimeOut = selectTimeOut.options[selectTimeOut.selectedIndex].value;

  var forRemoveIn = document.getElementById('timein').querySelector('option[selected]');
  forRemoveIn.removeAttribute('selected');

  var addSelectedIn = document.getElementById('timein').querySelector('option[value="' + selectedTimeOut + '"]');
  addSelectedIn.setAttribute('selected', 'selected');
});

var selectRoomNumber = document.getElementById('room_number');
var accessCapacity = document.getElementById('capacity');

// заблокировал выбор комнат
var Room = accessCapacity.querySelectorAll('option');
for (var r = 0; r < Room.length; r++) {
  Room[r].setAttribute('disabled', 'disabled');
}

selectRoomNumber.addEventListener('change', function () {
  var selectedRoomNumber = selectRoomNumber.options[selectRoomNumber.selectedIndex].value;
  var allRooms = accessCapacity.querySelectorAll('option');
  for (var q = 0; q < allRooms.length; q++) {
    allRooms[q].setAttribute('disabled', 'disabled');
    allRooms[q].removeAttribute('selected');
  }
  if (selectedRoomNumber <= 3) {
    for (var t = 1; t <= selectedRoomNumber; t++) {
      accessCapacity.querySelector('option[value="' + t + '"]').removeAttribute('disabled');
      accessCapacity.querySelector('option[value="' + t + '"]').setAttribute('selected', 'selected');
    }
  }
  if (selectedRoomNumber === 100) {
    accessCapacity.querySelector('option[value="0"]').removeAttribute('disabled');
    accessCapacity.querySelector('option[value="0"]').setAttribute('selected', 'selected');
  }
});
