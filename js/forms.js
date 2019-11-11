'use strict';
//(function(){// модуль forms.js

//активировала страницу;
var mainPin = document.querySelector('.map__pin--main');
var formActivity = document.querySelector('.ad-form');
var formsDisabled = document.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
var mapElement = document.querySelector('.map');


 var addAttribute = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', 'true');
    }
    addressInput.value = x + ',' + y;
  };
  addAttribute(formsDisabled);

  var removeAttributFromMap = function() {
    mapElement.classList.remove('map--faded');
    formActivity.classList.remove('ad-form--disabled');
    mapElement.classList.remove('map--faded');
      for (var i = 0; i < formsDisabled.length; i++) {
      formsDisabled[i].removeAttribute('disabled');
    }
    addressInput.value = x + ',' + fullY;
  };

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

var x = Math.floor(getCoords(mainPin).left + window.data.MAP_PIN_WIDTH/2);
var fullY = Math.floor(getCoords(mainPin).top + window.data.MAP_PIN_ACTIV_HEIGHT);
var y = Math.floor(getCoords(mainPin).top + window.data.MAP_PIN_HEIGHT/2);


addressInput.value = x + ',' + y;

// удаляем атрибуты по нажатию на мышку

mainPin.addEventListener('mousedown', function() {
  removeAttributFromMap();
});

// удаляем атрибуты по нажатию на клавишу enter
var ENTER_KEYCODE = 13;

mainPin.addEventListener('keydown', function(evt) {
  if( evt.keyCode === ENTER_KEYCODE){ 
    removeAttributFromMap();
  }
});

//Валидация формы: заголовок объявления

var titleInput = document.querySelector('#title');

titleInput.addEventListener('invalid', function (evt) {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30ти символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок не должен привышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Заголовок должен состоять минимум из 30ти символов');
  }else if (target.value.length > 100) {
    target.setCustomValidity('Заголовок не должен привышать 100 символов');
  } else {
    target.setCustomValidity('');
  }
});

//Валидация формы: цена за ночь

var priceInput = document.querySelector('#price');

//Валидация формы: «Тип жилья»
var selectTypeOfHous = document.querySelector('#type');
selectTypeOfHous.addEventListener ('change', function(evt){
  selectTypeOfHous.value = evt.target.value;
  if (evt.target.value == 'bungalo') {

    priceInput.setAttribute('min', 0);

    } else if (evt.target.value == 'flat') {

        priceInput.setAttribute('min', 1000);

      }else if (evt.target.value == 'house') {

          priceInput.setAttribute('min', 5000);

        }else {

          priceInput.setAttribute('min', 10000);
        }
});



//Валидация формы: «Время заезда и выезда»

var selectTimein = document.querySelector('#timein');
var selectTimeout = document.querySelector('#timeout');


selectTimein.addEventListener ('change', function(evt) {

  var target = evt.target.value;

  selectTimeout.addEventListener ('change', function(evt) {

    target  = evt.target.value;
    
  });
  });



//Валидация формы: «Количество комнат» синхронизировано с полем «Количество мест»
var selectRoom = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

function validateForm() {
  var validate = true;
  if(selectCapacity.options[selectCapacity.selectedIndex].value <= selectRoom.options[selectRoom.selectedIndex].value && selectCapacity.options[selectCapacity.selectedIndex].value != '0' && selectRoom.options[selectRoom.selectedIndex].value != '100') {
    validate;
      } else if(selectRoom.options[selectRoom.selectedIndex].value >= selectCapacity.options[selectCapacity.selectedIndex].value && selectCapacity.options[selectCapacity.selectedIndex].value != '0' && selectRoom.options[selectRoom.selectedIndex].value != '100'){
        validate;
      } else if(selectCapacity.options[selectCapacity.selectedIndex].value === '0' && selectRoom.options[selectRoom.selectedIndex].value === '100') {
        validate;
      } 
      else {
        validate = false;
       }
 return validate;
}
   
selectRoom.addEventListener('change', function(evt) {
  var target = evt.target.value;
  if (validateForm()) {
  selectRoom.setCustomValidity('');
    }else if ( target === '1'){  
      selectRoom.setCustomValidity('1 комната — «для 1 гостя»');
      
      }
      else if ( target === '2'){  
        selectRoom.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
        
        }else if ( target === '3'){  
          selectRoom.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
          
          }else if ( target === '100'){  
            selectRoom.setCustomValidity('100 комнат — «не для гостей»');   
}
});
/*
selectCapacity.addEventListener('change', function(evt) {
  var target = evt.target.value;
  if (validateForm()) {
  selectCapacity.setCustomValidity('');
    }else if ( target === '1'){  
      selectCapacity.setCustomValidity('«для 1 гостя» - 1 комната');
      
      }
      else if ( target === '2'){  
        selectCapacity.setCustomValidity('«для 2 гостей» - 2 комнаты');
        
        }else if ( target === '3'){  
          selectCapacity.setCustomValidity('«для 3 гостей» - 3 комнаты ');
          
          }else if ( target === '0'){  
            selectCapacity.setCustomValidity('«не для гостей»  - 100 комнат');        
  }        
}); 
*/
// module4-task3

var buttonsClose = document.querySelectorAll('.popup__close');
var popupMapCards = document.querySelectorAll('.popup');

//скрыли карточки объявлений

var hideElement = function(arr) {
  for (var i = 0; i < arr.length; i++) {  
arr[i].style.display = 'none';
}
};


hideElement(popupMapCards);

var buttonMapPins = document.querySelectorAll('.map__pin');
var buttonMapPinsImg = document.querySelectorAll('.map__pin img');

// Добавляем дата аттрибуты;

var getDatasetAttr = function(arr, numberDataId)  {
for (var i = 0; i < arr.length; i++) {
  arr[i].setAttribute('data-id', numberDataId);
  arr[i].dataId = numberDataId ; 
  numberDataId++;  
  }
};

getDatasetAttr(buttonMapPins, 0);
getDatasetAttr(buttonMapPinsImg, 0);
getDatasetAttr(popupMapCards, 1);

var MapPinsClickHeandler = function(evt) {
  var target = evt.target.getAttribute('data-id');

  for (var i = 0; i < popupMapCards.length; i++) { 
    popupMapCards[i].style.display = 'none'; 
    var numberId = popupMapCards[i].getAttribute('data-id');
    if(target === numberId) {
      popupMapCards[i].style.display = 'block'; 
    };
  } 
 };    

window.mapPins.addEventListener('click', function(evt) {
  MapPinsClickHeandler(evt);
});

window.mapPins.addEventListener('keydown', function(evt) {
  if( evt.keyCode === ENTER_KEYCODE){ 
    MapPinsClickHeandler(evt);
  }
});


var buttonClickHandler = function() {
for (var i = 0; i < buttonsClose.length; i++) { 
  buttonsClose[i].addEventListener('click', function(evt){
    var target = evt.target;
    target.parentElement.style.display = 'none';
  }); 
  }
};

mapElement.addEventListener('click',function(){
  buttonClickHandler();
mapElement.removeEventListener('click', buttonClickHandler);
});

// перемещение метки.
  var limits = {
  top: window.data.COORD_Y_MIN,
  right: mapElement.offsetWidth - mainPin.offsetWidth/2,
  bottom: window.data.COORD_Y_MAX - window.data.MAP_PIN_ACTIV_HEIGHT,
  left: mapElement.offsetLeft - mainPin.offsetWidth/2
};


var minY = window.data.COORD_Y_MIN;
var maxY = window.data.COORD_Y_MAX;
var minX = 0;
var maxX = mapElement.offsetWidth;

var isDrag = false;

mainPin.addEventListener('mousedown', function(evt){
  evt.preventDefault();
  isDrag = true;
 
  addressInput.value = Math.floor(getCoords(mainPin).left + window.data.MAP_PIN_WIDTH/2) + ',' + Math.floor(getCoords(mainPin).top + window.data.MAP_PIN_ACTIV_HEIGHT);
  
var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

  


function MouseMoveHendler(moveEvt){
  moveEvt.preventDefault();
 
  var shift = { // на какую величину призошло смещение
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

// новые координаты метки
  startCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };

  // координаты метки с учетом смещения
  mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
  mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
 
// записываем новые координаты в импут
  addressInput.value = Math.floor(mainPin.offsetLeft - shift.x + window.data.MAP_PIN_WIDTH/2) + ',' + Math.floor(mainPin.offsetTop - shift.y + window.data.MAP_PIN_ACTIV_HEIGHT);

if (isDrag) {
  console.log(isDrag)
    move(startCoords);
  }
  
  function move(evt) {
    //console.log(startCoords.x);
  var newLocation = {
    x: limits.left,
    y: limits.top
  };console.log(newLocation.x);
  if (evt.y < 130 || evt.y > 630) {
    
  return;
   
  }

  if (evt.x < 130 || evt.x > 630){
    return; 
   
  }
 relocate(newLocation);
   
  
  
}

// размещение mainPin
function relocate(newLocation) {
  mainPin.style.left = newLocation.x + 'px';
  mainPin.style.top = newLocation.y + 'px';
};
  
   

}

function MouseUpHendler(upEvt){
  upEvt.preventDefault();
  var addres = addressInput.value;
  isDrag = false; 

  document.removeEventListener('mousemove', MouseMoveHendler);
  document.removeEventListener('mouseup', MouseUpHendler);
}
  document.addEventListener('mousemove', MouseMoveHendler);
  document.addEventListener('mouseup', MouseUpHendler);
});

//ограничиваем перемещение метки


//})();