'use strict';
(function(){//модуль map.js

var mapPins = document.querySelector('.map__pins');
var buttonMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var getDocumentFragment = function() {
var fragmentPin = document.createDocumentFragment();
  for(var i=0; i < window.data.arrayUsers.length; i++) {
    var buttonPin = buttonMapPin.cloneNode(true);
    buttonPin.style.left = window.data.arrayUsers[i].location.x + 'px';
    buttonPin.style.top = window.data.arrayUsers[i].location.y + 'px';
    buttonPin.querySelector('img').src = window.data.arrayUsers[i].author.avatar; 
    buttonPin.querySelector('img').alt = window.data.arrayUsers[i].offer.title;
    fragmentPin.appendChild(buttonPin);
  }
    mapPins.appendChild(fragmentPin);   
}
getDocumentFragment(); 

//DOM - элементы. Карточка объявлений.

var mapFiltersContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var card = document.querySelector('#card').content.querySelector('.map__card');

var renderMapCard = function(){
  var fragmentMapCard = document.createDocumentFragment();
  for(var i=0; i < window.data.arrayUsers.length ; i++) {
  var mapCardelement = card.cloneNode(true);
    mapCardelement.querySelector('.popup__title').innerHTML = window.data.arrayUsers[i].offer.title;
    mapCardelement.querySelector('.popup__text--address').innerHTML = window.data.arrayUsers[i].offer.address;
    mapCardelement.querySelector('.popup__text--price').innerHTML = window.data.arrayUsers[i].offer.price + '₽/ночь.';
    mapCardelement.querySelector('.popup__type').innerHTML = window.data.arrayUsers[i].offer.type;
    mapCardelement.querySelector('.popup__text--capacity').innerHTML = window.data.arrayUsers[i].offer.rooms + ' ' + window.data.arrayUsers[i].offer.guests;
    mapCardelement.querySelector('.popup__text--time').innerHTML =  'Заезд ' + window.data.arrayUsers[i].offer.checkin + ' ' + window.data.arrayUsers[i].offer.checkout;
    mapCardelement.querySelector('.popup__features').innerHTML = window.data.arrayUsers[i].offer.features;
    mapCardelement.querySelector('.popup__description').innerHTML = window.data.arrayUsers[i].offer.description;  
    mapCardelement.querySelector('.popup__photos img').src = window.data.arrayUsers[i].offer.photos[0];
    mapCardelement.querySelector('.popup__avatar').src = window.data.arrayUsers[i].author.avatar;
      fragmentMapCard.appendChild(mapCardelement);
    }
      map.insertBefore(fragmentMapCard, mapFiltersContainer);
 };
 renderMapCard();

window.mapPins = mapPins;
})();
