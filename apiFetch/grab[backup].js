var xhr = new XMLHttpRequest();
//id for butter
var itemTest = "12138"
var div = document.getElementById("butter");
//takes String "item" and returns String api info
var grabber = function(item) {
	// body...
	xhr.open("GET","https://api.guildwars2.com/v2/commerce/listings/"+item,false);
	xhr.send();
	return xhr.responseText;
}

//string: takes 2 strings, 1 of strings and 1 of ints; returns the number after this.
//glitch: makes an empty element between values. find and optimize.
var parse = function (list1,list2) {
	var output = [];
	for (var i = 0; i < list2.length; i++) {
		output[i] = list1[list2[i]];
		if(output[i]== " "){
			output.splice(i,1);
		}
	}
	return output;
}

//string; takes a string input and the search target and returns a list of positions.
var search = function (input,target) {
	//list for return:
	var output = [];
	for (var i = 0; i < input.length; i++) {
		if(input[i] == target){
			output.push(i+1);
		}
	};
	return output;
}

//takes an array input deletes the empty elements
var clean = function (input) {
	var output = [];
	for(i = 0; i < input.length;i++){
		if(input[i]){
			output.push(input[i]);
		}
	}
	//turns the strings in the list to ints

	return output;
}

//main
var test = grabber(itemTest);
test = test.split('"sells"');
var test2 = test[0].split(" ");
test2 = clean(test2);
var test3 = search(test2,'"unit_price":');
test3 = clean(test3);
var test4 = parse(test2,test3);

$(document).ready(function(){
	$(butter).text(test[0]);
	$("p").text(test2);
	$(document.getElementById("test")).text(test3);
	$(document.getElementById("test2")).text(test4);
});