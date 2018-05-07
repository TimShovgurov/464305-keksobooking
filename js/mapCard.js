'use strict';
(function () {
// открытие и закрытие объявления
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
      cardFragment = window.renderComponents.renderPopUp(window.data.objectArray[activePinIndex]);
      mapContainer.insertAdjacentElement('beforeBegin', cardFragment);
    }
    var popUpCard = document.querySelector('.map__card');
    document.addEventListener('click', function (evt) {
      if (evt) {
        var activeButton = evt.target.parentNode;
        var activedButton = evt.target;
        if (activedButton.tagName === 'BUTTON' && popUpCard) {
          if (activeButton.tagName === 'ARTICLE' && popUpCard) {
            removeDialogPanel();
          }
        }
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escEvent && popUpCard) {
        removeDialogPanel();
      }
    });
  });
})();
