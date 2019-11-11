'use strict';
(function(){
window.upload = function(data, onSuccess){
	var xhr = new XMLHttpRequest();

	xhr.ResponseType = 'json';

	xhr.addEventListener('load', function() {
		onSuccess(xhr.response);
	})


	xhr.open('POST', 'https://js.dump.academy/keksobooking/data');

	xhr.send(data);

}

})();