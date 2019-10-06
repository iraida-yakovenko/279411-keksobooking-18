'use strict';
// делаем карту активной.
var mapElement = document.querySelector('.map');
//фото пользователя
var avatarString = 'img/avatars/userxx.png'; 
//координыты
var LocationX = randomInteger(20, document.documentElement.clientWidth) - 20; 
var LocationY = randomInteger(130, 630) - 33;
var addForm = document.querySelector('.ad-form');
<<<<<<< HEAD
//var cardTemplate =  document.querySelector('#card')
    //.content
    //.querySelector('.map__card');
=======
var cardTemplate =  document.querySelector('#card')
    .content
    .querySelector('.map__card');
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c
var price = document.querySelector('#price');
var inputs = document.querySelectorAll('input[type=text]');
var description = document.querySelector('#description');
var selectType = document.querySelector('#type');
var selectRoomNumber = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');
var selectTimein = document.querySelector('#timein');
var selectTimeout = document.querySelector('#timeout');
var featuresArr = document.querySelectorAll('.feature');
var featuresArrNew = [];
var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var arrayPhotosNew = [];
var images = document.querySelector('#images');


mapElement.classList.remove('map--faded');

//делаем форму заполнения объявлений активоной.
addForm.classList.remove('ad-form--disabled');

// стоимось жилья
price.addEventListener('change', function (evt){
 price.value = evt.target.value; 
 console.log(price.value);
});

//обработчик для всех текстовых инпутов, кроме текстареа
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', function(){
    inputs = this.value;
})
<<<<<<< HEAD
}
=======
};
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c

//строка с описанием,
description.addEventListener('change', function (evt){
 description.value = evt.target.value; 
 console.log(description.value);
});

//palace, flat, house или bungalo
selectType.addEventListener('change', function (evt){
selectType.value = evt.target.value;
});

//количество комнат
selectRoomNumber.addEventListener('change', function (evt){
selectRoomNumber.value = evt.target.value;
});

//количество гостей, которое можно разместить
selectCapacity.addEventListener('change', function (evt){
selectCapacity.value = evt.target.value;
});

// время заезда 
selectTimein.addEventListener('change', function (evt){
 selectTimein.value = evt.target.value;
});

//время отъезда
selectTimeout.addEventListener('change', function (evt){
selectTimeout.value = evt.target.value;
});

// массив произвольной длинны
<<<<<<< HEAD
  for (i = 0; i < featuresArr.length; i++) {
      featuresArr[i].onclick = function(evt){
        featuresArrNew.push(evt.target.innerHTML)
      }
    }
=======
  for (var i = 0; i < featuresArr.length; i++) {
      featuresArr[i].onclick = function(evt){
        featuresArrNew.push(evt.target.innerHTML)
      }
    };
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c
 // массив фотографий
images.addEventListener('click', function(){
  for (var i = 0; i < arrayPhotos.length; i++) {
    if(arrayPhotos[i].checked){
      arrayPhotosNew.push(arrayPhotos[i]);
    }
      }
      console.log(arrayPhotosNew);
    });



function getNewStr (avatarString) {
  var arrAvatar = avatarString.split('');
  arrAvatar[16] = 0;
  arrAvatar[17] = randomInteger(1, 8);  
  avatarString = arrAvatar.join('');
    return avatarString;
<<<<<<< HEAD
}
=======
};
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c

//функция генерации случайных чисел.
  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
<<<<<<< HEAD
  }
=======
  };
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c

//функция создания массива из объектов.
function createArrayUsers (){ 
  var ArrayUsers  = [createObjectUser()];
  for (var i = 1; i < 8; i++) {
    ArrayUsers[i] = createObjectUser(); 
<<<<<<< HEAD
  }
return ArrayUsers;
}
=======
  };
return ArrayUsers;
};
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c
console.log(createArrayUsers());

//функция создания объектов.
function createObjectUser () {
var objectUser = new Object ( 
 {  'author': {
    'avatar': getNewStr(avatarString),
  },
    'offer': {
    'title': inputs, 
    'type': selectType,
    'address':  LocationX, LocationY,
    'price': price, 
    'rooms': selectRoomNumber,
    'description': description,
    'features': featuresArrNew ,
    'guests': selectCapacity,
    'checkin': selectTimein,
    'checkout': selectTimeout,
    'photos': arrayPhotos,
   },
'location': {
    'x':LocationX,
    'y':LocationY,
  },
}
  )
return objectUser;
<<<<<<< HEAD
}

=======
};
 
console.log(createObjectUser());
>>>>>>> f33bf9e7b791157b75a867046a009f0f29cf0c5c
