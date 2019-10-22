'use strict';
(function(){ //модуль data.js
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 65;
  var MAP_PIN_ACTIV_WIDTH = 50;
  var MAP_PIN_ACTIV_HEIGHT = 70;
  var COORD_Y_MIN = 130;
  var COORD_Y_MAX = 630
  var typeArr = ['Бунгало', 'Квартира', 'Дом', 'Дворец'];
  var timesinArr = ['после 12', 'после 13', 'после 14'];
  var timesOutArr = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
  var guestsArr = ['для 3 гостей', 'для 2 гостей', 'для 1 гостей', 'не для гостей'];
  var roomsArr = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
  var featuresArr = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];

  var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Получение рандомного элемента из массива

  function randomArr(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return(arr[rand]);
  }

  //функция генерации случайных чисел.


  function randomInteger (min, max) {
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

  function createObjectUser() {
    var locationX = randomInteger(MAP_PIN_WIDTH, document.documentElement.clientWidth) - MAP_PIN_WIDTH; 
    var locationY = randomInteger(COORD_Y_MIN, COORD_Y_MAX) - MAP_PIN_HEIGHT;
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

  window.data = {
    MAP_PIN_WIDTH : MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT : MAP_PIN_HEIGHT,
    COORD_Y_MIN : COORD_Y_MIN,
    COORD_Y_MAX : COORD_Y_MAX,
    arrayUsers : arrayUsers,
    randomArr : randomArr,
    randomInteger : randomInteger, 
    createArrayUsers : createArrayUsers,
    createObjectUser : createObjectUser,
    arrayStrings : arrayStrings,
  };

})();
