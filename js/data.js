'use strict';
(function () {
  var ADVERTS_COUNT = 8;
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
      var locationX = window.util.getRandomInRange(300, 900);
      var locationY = window.util.getRandomInRange(150, 500);
      objectMas[i] = {
        'author': {
          'avatar': getAvatar(i + 1)
        },

        'offer': {
          'title': getTitle(i + 1),
          'address': locationX + ', ' + locationY,
          'price': window.util.getRandomInRange(1000, 1000000),
          'type': window.util.getRandomIndexFromArrray(typeMas),
          'rooms': window.util.getRandomInRange(1, 5),
          'guests': window.util.getRandomInRange(1, 10),
          'checkin': window.util.getRandomIndexFromArrray(checkinTime),
          'checkout': window.util.getRandomIndexFromArrray(checkoutTime),
          'features': window.util.getRandomIndexFromArrray(featuresMas),
          'description': ' ',
          'photos': getRandomPhotos(photosMas)
        },

        'location': {
          'x': window.util.getRandomInRange(300, 900),
          'y': window.util.getRandomInRange(150, 500),
        },
      };
    } return objectMas;
  };

  var objectArray = newDomObject(ADVERTS_COUNT);

  // экспорт отрисовки пинов и карточек
  window.data = {
    objectArray: objectArray,
    typeMas: typeMas
  };
})();
