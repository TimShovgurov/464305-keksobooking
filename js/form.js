'use strict';
(function () {
  var appartmentPrice = document.getElementById('price');
  var selectType = document.getElementById('type');

  selectType.addEventListener('change', function () {
    if (selectType.options[0].selected === true) {
      appartmentPrice.min = 1000;
      appartmentPrice.placeholder = '1000';
    } else if (selectType.options[1].selected === true) {
      appartmentPrice.min = 0;
      appartmentPrice.placeholder = '0';
    } else if (selectType.options[2].selected === true) {
      appartmentPrice.min = 5000;
      appartmentPrice.placeholder = '5000';
    } else if (selectType.options[3].selected === true) {
      appartmentPrice.min = 10000;
      appartmentPrice.placeholder = '10000';
    }
  });

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

  if (selectRoomNumber.options[0].selected === true) {
    accessCapacity.options[2].selected = true;
    accessCapacity.options[0].disabled = true;
    accessCapacity.options[1].disabled = true;
    accessCapacity.options[3].disabled = true;
  }

  selectRoomNumber.addEventListener('change', function () {
    var roomCount = selectRoomNumber.value;
    if (roomCount !== 100) {
      for (var i = 1; i <= 3; i++) {
        accessCapacity.options[3 - i].disabled = i > roomCount;
      }
      accessCapacity.options[3 - roomCount].selected = true;
    } else {
      for (i = 0; i <= 3; i++) {
        accessCapacity.options[i].disabled = i !== 3;
      }
      accessCapacity.options[3].selected = true;
    }
  });
})();
