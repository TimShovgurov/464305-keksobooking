var ADVERTS_COUNT = 8;
var typeMas = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosMas = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" , "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var getTitle = function(index) {
    var houseTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    return houseTitles[index];
}

var getAvatar = function(index) {
    return 'img/avatars/user0' + index + '.png';
}

var getRandomInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomIndex = function(arr){
  return Math.floor(Math.random() * arr.length);
}

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
    
var newDomObject = function(objectCount){
    var objectMas = [];
    //var object = {};
    for (var i = 0; i =>objectCount; i++) {
        var locationX = getRandomInRange(300,900);
        var locationY = getRandomInRange(150,500);
        
        objectMas[i] = {
            "author": {
                "avatar": getAvatar(i+1)
            },
        
            "offer": {
                "title": getTitle(i+1),
                "address": locationX + ',' + locationY,
                "price": getRandomInRange(1000, 1000000), 
                "type": getRandomIndex(typeMas),
                "rooms": getRandomInRange(1,5),
                "guests": getRandomInRange(1,10),
                "checkin": getRandomIndex(checkinTime),
                "checkout": getRandomIndex(checkoutTime),
                "features": getRandomIndex(featuresMas),
                "description": ' ',
                "photos": getRandomPhotos(photosMas)
            },
        
            "location": {
                "x": getRandomInRange(300,900),
                "y": getRandomInRange(150,500), 
            },
        }
    }return objectMas;
}

//var objectArray = newDomObject(ADVERTS_COUNT);


/*
function renderPins (objectMass) {
    var template = document.querySelector('.map__pins');
    var similarElement = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    //debugger
    adverts.forEach(function(item) {
      
      var element = similarElement.cloneNode(true); 
      // debugger
      element.querySelector('img').setAttribute('src', item.author.avatar);
      element.setAttribute('style', 'left: ' + item.location.x + 'px; ' + 'top:' + item.location.y + 'px');
      fragment.appendChild(element);
      template.appendChild(fragment);
    })
  };
  */