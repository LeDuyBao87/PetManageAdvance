'use strict';
function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

//usage:
$('#import-btn').click(function(event) {
	let inputFile = $('#input-file').val();

	readTextFile('../petsList.JSON', function(text){
		var data = JSON.parse(text);
		console.log(data);
	});
});



$('#export-btn').click(function(event) {
	let pets = localStorage.getItem('pets') ? JSON.parse(localStorage.getItem('pets')) : [];
	console.log(pets);
	let petsList = JSON.stringify(pets);
	var blob = new Blob([petsList], 
	{
		type:"application/json;utf - 8"
	}
	);

	var userLink = document.createElement('a');
	userLink.setAttribute('download', 'petsList.JSON');
	userLink.setAttribute('href', window.URL.createObjectURL(blob));
	userLink.click();
});





