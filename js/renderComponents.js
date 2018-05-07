'use strict';
(function () {
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

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  };
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
      cardElement.querySelector('.popup__type').textContent = window.data.typeMas[item.offer.type];
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

    // экспорт отрисовки пинов и карточек
  window.renderComponents = {
    renderPins: renderPins,
    renderPopUp: renderPopUp
  };
})();
