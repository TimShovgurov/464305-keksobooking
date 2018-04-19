'use strict';
var ADVERTS_COUNT = 8;
var typeMas = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var cityMap = document.querySelector('.map');
cityMap.classList.remove('map--faded');

var offerCollate = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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
function renderPins(objectivMas) {
  var template = document.querySelector('.map__pins');
  var similarElement = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  objectivMas.forEach(function (item) {
    var element = similarElement.cloneNode(true);
    element.querySelector('img').setAttribute('src', item.author.avatar);
    element.setAttribute('style', 'left: ' + item.location.x + 'px; ' + 'top:' + item.location.y + 'px');
    fragment.appendChild(element);
    template.appendChild(fragment);
  });
}

renderPins(objectArray);

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
  for (var i = 0; i < photos.length; i++) {
    var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
    similarElement.querySelector('img').setAttribute('src', photos[i]);
    similarElement.querySelector('img').setAttribute('height', 60);
    similarElement.querySelector('img').setAttribute('width', 60);
    fragment.appendChild(similarElement);
  }
  return fragment;
};

function renderPopUp(data) {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card popup');
  var cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.popup__avatar').src = data.author.avatar;
  cardItem.querySelector('.popup__avatar').alt = data.offer.title;
  cardItem.querySelector('.popup__title').textContent = data.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = data.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
  cardItem.querySelector('.popup__type').textContent = offerCollate[data.offer.type];
  cardItem.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardItem.querySelector('.popup__description').textContent = data.offer.description;
  renderFeatures(data.offer.features, cardItem);
  renderPictures(data.offer.photos, cardItem);
  return cardItem;
}
var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderPopUp(objectArray[0]));
document.querySelector('.map').insertBefore(cardFragment, document.querySelector('.map__filters-container'));
