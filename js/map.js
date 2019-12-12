'use strict';
(function(){ //load.js

//# sourceURL=map.js  
var URL = 'https://js.dump.academy/keksobooking/data';

/*
function onError(message) {
  console.error(message);
};
function onSuccess(dataJson){
  var responseObj = dataJson;
console.log(responseObj);
};
*/
window.load = function(onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open('GET', URL, true);

  xhr.addEventListener('load', function() {
 console.log(xhr.readyState); 

// console.log(xhr.status + ' ' + xhr.statusText);
//if (xhr.status === 200) {

        onSuccess(xhr.response);

      //} else {
       // onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
     // };

});

/*
xhr.addEventListener('error', function() {
  onError('Произошла ошибка соединения');
});
xhr.addEventListener('timeout', function() {
  onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
}); 
xhr.timeout = 10000;
*/

xhr.send();

//alert('hallo');
//console.log(xhr.readyState);
};

})();

(function(){ //модуль map.js
  var mapPins = document.querySelector('.map__pins');
  var buttonMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  // клонируем метку.
  var renderButtonPin = function(userOffer){

    var pinElement = buttonMapPin.cloneNode(true);
    
      pinElement.style.left = userOffer.location.x + 'px';
      pinElement.style.top = userOffer.location.y + 'px';
      pinElement.querySelector('img').src = userOffer.author.avatar; 
      pinElement.querySelector('img').alt = userOffer.offer.title;
    return pinElement;

  };

  //DOM - элементы. Карточка объявлений.

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var cardPhoto = document.querySelector('#card').content.querySelector('.popup__photos img');

  // функция добавления фотографий в раздел "фото жилья"
  //клонируем и вставляем элемент в родительский, пока перебераем массив и прописываем всем клонам src
  /*
  function getArrayPhotos(array, clonElement, parentElement){
    
    for(var i = 0; i < array.length; i++) {
      var cardPhotoClone =  clonElement.cloneNode(true); 
      cardPhotoClone.src = array[i];
    parentElement.appendChild(cardPhotoClone);
    }
   return;
  };
  */
  // получаем массив удобств
  var getArrayFeatures  = function(array, parentElement) {
  for (var i = 0; i < array.length; i++) {  
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--'+ array[i]);

  parentElement.appendChild(li);
  }
  return;
  };

  // получаем массив фотографий
  var getArrayPhoto = function(array, parentElement) {
  for (var i = 0; i < array.length; i++) {  
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = array[i];
    img.style.width = 45 + 'px';
    img.style.height = 40 + 'px';
    img.alt = 'Фотография жилья';
  parentElement.appendChild(img);
  }
  return;
  };

  var renderMapCard = function(userOffer){

    var mapCardElement = card.cloneNode(true);
      mapCardElement.querySelector('.popup__title').innerHTML = userOffer.offer.title;
      mapCardElement.querySelector('.popup__text--address').innerHTML = userOffer.offer.address;
      mapCardElement.querySelector('.popup__text--price').innerHTML = userOffer.offer.price + '₽/ночь.';
      mapCardElement.querySelector('.popup__type').innerHTML = userOffer.offer.type;
      mapCardElement.querySelector('.popup__text--capacity').textContent = userOffer.offer.rooms + ' комнатa для ' +  userOffer.offer.guests + ' гостей';
      mapCardElement.querySelector('.popup__text--time').innerHTML =  'Заезд ' + userOffer.offer.checkin + ' Выезд' + userOffer.offer.checkout;
      mapCardElement.querySelector('.popup__features').textContent  = getArrayFeatures(userOffer.offer.features, mapCardElement.querySelector('.popup__features'));
      getArrayFeatures(userOffer.offer.features, mapCardElement.querySelector('.popup__features'));
      mapCardElement.querySelector('.popup__description').textContent = userOffer.offer.description;
      mapCardElement.querySelector('.popup__photos').textContent = getArrayPhoto(userOffer.offer.photos, mapCardElement.querySelector('.popup__photos'));  
      getArrayPhoto(userOffer.offer.photos, mapCardElement.querySelector('.popup__photos'));
      //mapCardElement.querySelector('.popup__photos').textContent = getArrayPhotos(userOffer.offer.photos, cardPhoto, mapCardElement.querySelector('.popup__photos'));  
      //getArrayPhotos(userOffer.offer.photos, cardPhoto, mapCardElement.querySelector('.popup__photos'));
      mapCardElement.querySelector('.popup__avatar').src = userOffer.author.avatar;
      return mapCardElement;
  };

  window.load(function(arrUsers) {
  var fragment = document.createDocumentFragment();

  for(var i=0; i < arrUsers.length; i++) {
      
      fragment.appendChild(renderButtonPin(arrUsers[i]));
      mapPins.appendChild(fragment);

      fragment.appendChild(renderMapCard(arrUsers[i]));
      map.insertBefore(fragment, mapFiltersContainer);
    }

  });

  var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      
      node.textContent = errorMessage; 
      document.body.insertAdjacentElement('afterbegin', node);
    };

  //window.load.load(successHandler, errorHandler);
  window.mapPins = mapPins;

 //load(URL, successHandler, errorHandler);

})();