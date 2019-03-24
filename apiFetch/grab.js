//id for butter
var itemTest = "12138"
/*var xhr = new XMLHttpRequest();

//takes String "item" and returns String api info
var grabber = function(item) {
	// body...
	xhr.open("GET","https://api.guildwars2.com/v2/commerce/listings/"+item,false);
	xhr.send();
	return xhr.responseText;
}*/

	
//string; takes a string input and the search target and returns a list of positions.
var searchy = function (input,target) {
	//list for return:
	var output;
	for (var i = 0; i < input.length; i++) {
		if(input[i]==target){
			output = input[i+1];
			break;
		}
	}
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
var main = function(apiData){
//replaces all commas,spaces, and colons with an empty element
apiData = apiData.replace(/\,/g,"");
apiData = apiData.replace(/\:/g,"");
//splits the string in half, between the buy orders and sell orders
apiData = apiData.split("sells");
//turns string of buy orders into a list without at each quotation mark
var rawBuy = apiData[0].split('"');
rawBuy = clean(rawBuy);
var buyPrice = searchy(rawBuy,'unit_price')/100;
buyQuantity = searchy(rawBuy, 'quantity');
//removes the { and } from the string returned.
buyQuantity = buyQuantity.replace(/\{/g,"");
buyQuantity = buyQuantity.replace(/\}/g,"");


$(document).ready(function(){
	$(butterBuyPrice).text(buyPrice);
	$(butterBuyQuantity).text(buyQuantity);

});
//document.write(rawBuy);
//document.write(apiData);

}