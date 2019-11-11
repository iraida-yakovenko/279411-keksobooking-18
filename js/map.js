'use strict';
(function(){
//модуль map.js

/*
//var URL = 'https://js.dump.academy/keksobooking/data';
var arrUsers = [];
var xhr = new XMLHttpRequest();
xhr.ResponseType = 'json';

var onError = function(message){

  console.error(message);

};

var onSuccess = function(data){

  var users = data;

};

var load = function(onSuccess, onError){

  xhr.open('GET', URL);

  xhr.addEventListener('load', function() {

   onSuccess(xhr.response);


  });

xhr.send();

};

*/
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

//отрисовываем метки на карте

function successHandlerButtonPin (arrUsers){
  //arrUsers = JSON.parse(xhr.responseText);

  var fragmentPin = document.createDocumentFragment();

  for(var i=0; i < arrUsers.length; i++) {
    
    fragmentPin.appendChild(renderButtonPin(arrUsers[i]));
  }
    mapPins.appendChild(fragmentPin);   

}

//DOM - элементы. Карточка объявлений.

var mapFiltersContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var card = document.querySelector('#card').content.querySelector('.map__card');
var cardPhoto = document.querySelector('#card').content.querySelector('.popup__photos img');

// функция добавления фотографий в раздел "фото жилья"
//клонируем и вставляем элемент в родительский, пока перебераем массив и прописываем всем клонам src
function getArrayPhotos(arrayPhotos, clonElement, parentElement){
  
  for(var i = 0; i < arrayPhotos.length; i++) {

    var cardPhotoClone =  clonElement.cloneNode(true); 
    cardPhotoClone.src = arrayPhotos[i];

  parentElement.appendChild(cardPhotoClone);

  }
 return;
}

var renderMapCard = function(userOffer){

  var mapCardElement = card.cloneNode(true);
    mapCardElement.querySelector('.popup__title').innerHTML = userOffer.offer.title;
    mapCardElement.querySelector('.popup__text--address').innerHTML = userOffer.offer.address;
    mapCardElement.querySelector('.popup__text--price').innerHTML = userOffer.offer.price + '₽/ночь.';
    mapCardElement.querySelector('.popup__type').innerHTML = userOffer.offer.type;
    mapCardElement.querySelector('.popup__text--capacity').textContent = userOffer.offer.rooms + ' комнатa для ' +  userOffer.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').innerHTML =  'Заезд ' + userOffer.offer.checkin + ' Выезд' + userOffer.offer.checkout;
    mapCardElement.querySelector('.popup__features').textContent  = userOffer.offer.features;
    mapCardElement.querySelector('.popup__description').textContent = userOffer.offer.description;
    mapCardElement.querySelector('.popup__photos').textContent = getArrayPhotos(userOffer.offer.photos, cardPhoto, mapCardElement.querySelector('.popup__photos'));  
    getArrayPhotos(userOffer.offer.photos, cardPhoto, mapCardElement.querySelector('.popup__photos'));
    mapCardElement.querySelector('.popup__avatar').src = userOffer.author.avatar;
    return mapCardElement;
};

function successHandlerMapCard (arrUsers){
  //arrUsers = JSON.parse(xhr.responseText);

var fragmentMapCard = document.createDocumentFragment();
  for(var i=0; i < arrUsers.length ; i++) {
   
      fragmentMapCard.appendChild(renderMapCard(arrUsers[i]));
    }
      map.insertBefore(fragmentMapCard, mapFiltersContainer);
  }

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

window.load.load(successHandlerButtonPin, errorHandler);
window.load.load(successHandlerMapCard, errorHandler);
window.mapPins = mapPins;

})();
