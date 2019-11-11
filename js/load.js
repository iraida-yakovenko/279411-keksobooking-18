'use strict';
(function(){
var URL = 'https://js.dump.academy/keksobooking/data';

var load = function(onSuccess, onError) {
var xhr = new XMLHttpRequest();

xhr.ResponseType = 'json';

xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

xhr.addEventListener('load', function() {
	//console.log(JSON.parse(xhr.responseText));
	if (xhr.status === 200) {

        onSuccess(xhr.response);

      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      };

});

xhr.addEventListener('error', function() {
	onError('Произошла ошибка соединения');
});

xhr.addEventListener('timeout', function() {
	onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
});	

xhr.timeout = 10000;


xhr.send();

};


function onError(message) {
  console.error(message);
};


function onSuccess(dataJson){
	var responseObj = dataJson;

	return;
};

window.load = {
	URL : URL,
	load : load
};

//window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();