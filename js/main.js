'use strict';

var typeArr = ['Бунгало', 'Квартира', 'Дом', 'Дворец'];
var timesinArr = ['После 12', 'После 13', 'После 14'];
var timesOutArr = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
var guestsArr = ['для 3 гостей', 'для 2 гостей', 'для 1 гостей', 'не для гостей'];
var featuresArr = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 65;
var arrayPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];


// Получение рандомного элемента из массива
function randomArr(arr) {
  var rand = Math.floor(Math.random() * typeArr.length);
  return(arr[rand]);
}

//функция генерации случайных чисел.
  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
  }

//функция создания массива из объектов.
function createArrayUsers (){ 
  var arrayUsers  = [];
  for (var i = 0; i < 8; i++) {
    arrayUsers[i] = createObjectUser(); 
  }
return arrayUsers;
}

//функция создания объектов.
function createObjectUser () {
  var locationX = randomInteger(MAP_PIN_WIDTH, document.documentElement.clientWidth) - MAP_PIN_WIDTH; 
  var locationY = randomInteger(130, 630) - MAP_PIN_HEIGHT;
    var objectUser = 
     {  'author': {
        'avatar': 'img/avatars/user0' + randomInteger(1, 8) + '.png',
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
// вставляла элементы
//вставка элементов;
var map = document.querySelector('.map__pins');
var button = document.querySelector('.map__pin');
var buttonImg = document.querySelector('.map__pin img');

function getDocumentFragment () {
var fragmentPin = document.createDocumentFragment();
  for(var i=0; i<8; i++) {
   var buttonPin = button.cloneNode(true);
    buttonPin.style.left = randomInteger(MAP_PIN_WIDTH, document.documentElement.clientWidth) - MAP_PIN_WIDTH + 'px';
    buttonPin.style.top = randomInteger(130, 630) - MAP_PIN_HEIGHT + 'px';
    buttonImg.src = 'img/avatars/user0' + randomInteger(1, 8) + '.png'; 
    buttonImg.alt = '';
    fragmentPin.appendChild(buttonPin);
  }
    map.appendChild(fragmentPin);
}
getDocumentFragment ();

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
  }
  addAttribute(formsDisabled);
      mainPin.addEventListener('mousedown', function(){
      mapElement.classList.remove('map--faded');
      formActivity.classList.remove('ad-form--disabled');
      mapElement.classList.remove('map--faded');
        for (var i = 0; i < formsDisabled.length; i++) {
        formsDisabled[i].removeAttribute('disabled');
  }
   addressInput.value = getCoords(mainPin).top + Math.floor(MAP_PIN_HEIGHT) + ',' + (getCoords(mainPin).left + Math.floor(MAP_PIN_WIDTH/2));   
    });


  mainPin.addEventListener('keydown', function (evt){
    if( evt.keyCode === 13) { 
      mapElement.classList.remove('map--faded');
      formActivity.classList.remove('ad-form--disabled');
      mapElement.classList.remove('map--faded');
        for (var i = 0; i < formsDisabled.length; i++) {
        formsDisabled[i].removeAttribute('disabled');
}
  addressInput.value = getCoords(mainPin).top + Math.floor(MAP_PIN_HEIGHT) + ',' + (getCoords(mainPin).left + Math.floor(MAP_PIN_WIDTH/2));

         }
    })

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

addressInput.value = Math.floor(getCoords(mainPin).top + MAP_PIN_HEIGHT/2) + ',' + Math.floor((getCoords(mainPin).left + MAP_PIN_WIDTH/2));


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

selectTimein.addEventListener ('change', function(evt){
  
  var target = evt.target.value;
  });

selectTimeout.addEventListener ('change', function(evt){
  
  var target  = evt.target.value;
  });

//Валидация формы: «Количество комнат» синхронизировано с полем «Количество мест»
var selectRoom = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

 function validateForm () {
 var validate = true;
  if(selectCapacity.options[selectCapacity.selectedIndex].value <= selectRoom.options[selectRoom.selectedIndex].value && selectCapacity.options[selectCapacity.selectedIndex].value != '0' && selectRoom.options[selectRoom.selectedIndex].value != '100') {
       validate;
          } else if(selectCapacity.options[selectCapacity.selectedIndex].value === '0' && selectRoom.options[selectRoom.selectedIndex].value === '100') {
            validate;
            } 
            else{
              validate = false;
             }
   return validate;
}
   
 selectRoom.addEventListener('change', function(evt){
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

 selectCapacity.addEventListener('change', function(evt){
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



