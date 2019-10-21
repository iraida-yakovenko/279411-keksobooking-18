'use strict';
var typeArr = ['Бунгало', 'Квартира', 'Дом', 'Дворец'];
var timesinArr = ['после 12', 'после 13', 'после 14'];
var timesOutArr = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
var guestsArr = ['для 3 гостей', 'для 2 гостей', 'для 1 гостей', 'не для гостей'];
var roomsArr = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
var featuresArr = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 65;
var MAP_PIN_ACTIV_WIDTH = 50;
var MAP_PIN_ACTIV_HEIGHT = 70;
var COORD_Y_MIN = 130;
var COORD_Y_MAX = 630
var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Получение рандомного элемента из массива

function randomArr(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return(arr[rand]);
}

//функция генерации случайных чисел.


function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
  }
  
// массив строк случайной длинны

function arrayStrings(arr) {  
var newArr = [];
  for (var i = 0; i < randomInteger(1, arr.length); i++) {
    newArr.push(arr[i]);
  }
   return newArr;
}

//функция создания массива

function createArrayUsers() {
  var arrayUsers  = [];

  for (var i = 0; i < 8; i++) {
    arrayUsers[i] = createObjectUser(); 

  }
return arrayUsers;
}


var arrayUsers = createArrayUsers();

// созданиe объектa.

function createObjectUser () {
  var locationX = window.randomInteger(MAP_PIN_WIDTH, document.documentElement.clientWidth) - MAP_PIN_WIDTH; 
  var locationY = window.randomInteger(COORD_Y_MIN, COORD_Y_MAX) - MAP_PIN_HEIGHT;
  var authorPhoto = 'img/avatars/user0' + randomInteger(1, 8) + '.png';
    var objectUser = 
     {  'author': {
        'avatar': authorPhoto,
      },
        'offer': {
        'title': '', 
        'type': '',
        'address':  locationX + "," + locationY,
        'price': '', 
        'rooms': randomArr(typeArr),
        'description': '',
        'features': randomArr(featuresArr) ,
        'guests': randomArr(guestsArr) ,
        'checkin': randomArr(timesinArr),
        'checkout': randomArr(timesOutArr),
        'photos':  arrayPhotos,
       },
    'location': {
        'x':locationX,
        'y':locationY,
      },
    }
  return objectUser;
}

//вставка элементов;

var mapPins = document.querySelector('.map__pins');
var buttonMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
function getDocumentFragment() {
var fragmentPin = document.createDocumentFragment();
  for(var i=0; i < arrayUsers.length; i++) {
    var buttonPin = buttonMapPin.cloneNode(true);
    buttonPin.style.left = arrayUsers[i].location.x + 'px';
    buttonPin.style.top = arrayUsers[i].location.y + 'px';
    buttonPin.querySelector('img').src = arrayUsers[i].author.avatar; 
    buttonPin.querySelector('img').alt = arrayUsers[i].offer.title;
    fragmentPin.appendChild(buttonPin);
  }
    mapPins.appendChild(fragmentPin);   
}
getDocumentFragment (); 

//DOM - элементы. Карточка объявлений.
var mapFiltersContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var card = document.querySelector('#card').content.querySelector('.map__card');

function renderMapCard (){
  var fragmentMapCard = document.createDocumentFragment();
  for(var i=0; i < arrayUsers.length ; i++) {
  var mapCardelement = card.cloneNode(true);
    mapCardelement.querySelector('.popup__title').innerHTML = arrayUsers[i].offer.title;
    mapCardelement.querySelector('.popup__text--address').innerHTML = arrayUsers[i].offer.address;
    mapCardelement.querySelector('.popup__text--price').innerHTML = arrayUsers[i].offer.price + '₽/ночь.';
    mapCardelement.querySelector('.popup__type').innerHTML = arrayUsers[i].offer.type;
    mapCardelement.querySelector('.popup__text--capacity').innerHTML = arrayUsers[i].offer.rooms + ' ' + arrayUsers[i].offer.guests;
    mapCardelement.querySelector('.popup__text--time').innerHTML =  'Заезд ' + arrayUsers[i].offer.checkin + ' ' + arrayUsers[i].offer.checkout;
    mapCardelement.querySelector('.popup__features').innerHTML = arrayUsers[i].offer.features;
    mapCardelement.querySelector('.popup__description').innerHTML = arrayUsers[i].offer.description;  
    mapCardelement.querySelector('.popup__photos img').src = arrayUsers[i].offer.photos[0];
    mapCardelement.querySelector('.popup__avatar').src = arrayUsers[i].author.avatar;
      fragmentMapCard.appendChild(mapCardelement);
    }
      map.insertBefore(fragmentMapCard, mapFiltersContainer);
 };
 renderMapCard();

// home work 4
//активировала страницу

var mainPin = document.querySelector('.map__pin--main');
var formActivity = document.querySelector('.ad-form');
var formsDisabled = document.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
var mapElement = document.querySelector('.map');


 function addAttribute (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', 'true');
    }
  };
  addAttribute(formsDisabled);

    var removeAttributFromMap = function() {
    mapElement.classList.remove('map--faded');
    formActivity.classList.remove('ad-form--disabled');
    mapElement.classList.remove('map--faded');
      for (var i = 0; i < formsDisabled.length; i++) {
      formsDisabled[i].removeAttribute('disabled');
  }
  addressInput.value = getCoordsElem(mainPin, MAP_PIN_HEIGHT, MAP_PIN_WIDTH/2).top + ',' + getCoordsElem(mainPin, MAP_PIN_HEIGHT, MAP_PIN_WIDTH/2).left; 
  };

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}


var getCoordsElem = function(elem, widthElem, heightElem){
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset + Math.floor(heightElem),
    left: box.left + pageXOffset + Math.floor(widthElem)
  };
};
 
 addressInput.value = getCoordsElem(mainPin, MAP_PIN_HEIGHT/2, MAP_PIN_WIDTH/2).top + ',' + getCoordsElem(mainPin, MAP_PIN_HEIGHT/2, MAP_PIN_WIDTH/2).left;

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
  });
if( selectTimein.options[selectTimein.selectedIndex].value === '12:00') {

  selectTimeout.addEventListener ('change', function(evt) {
    var target  = evt.target.value;
    target.value = '12:00';
  });
}



//Валидация формы: «Количество комнат» синхронизировано с полем «Количество мест»
var selectRoom = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

function validateForm() {
  var validate = true;
  if(selectCapacity.options[selectCapacity.selectedIndex].value <= selectRoom.options[selectRoom.selectedIndex].value && selectCapacity.options[selectCapacity.selectedIndex].value != '0' && selectRoom.options[selectRoom.selectedIndex].value != '100') {
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

mapPins.addEventListener('click', function(evt) {
  MapPinsClickHeandler(evt);
});

mapPins.addEventListener('keydown', function(evt) {
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


  




