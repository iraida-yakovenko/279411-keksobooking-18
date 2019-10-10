'use strict';

var mapElement = document.querySelector('.map');
var typeArr = ['Бунгало', 'Квартира', 'Дом', 'Дворец'];
var timesinArr = ['После 12', 'После 13', 'После 14'];
var timesOutArr = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
var guestsArr = ['для 3 гостей', 'для 2 гостей', 'для 1 гостей', 'не для гостей'];
var featuresArr = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
var MAP_PIN_WIDTH = 44;
var MAP_PIN_HEIGHT = 66;
var arrayPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var map = document.querySelector('.map__pins');
var button = document.querySelector('.map__pin');
var buttonImg = document.querySelector('.map__pin img');

// делаем карту активной.
  mapElement.classList.remove('map--faded');


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

//вставка элементов;

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


