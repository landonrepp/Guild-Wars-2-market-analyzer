itemArr = []

$(document).ready(()=>{
    angular
	.module('itemLists', [])
	.controller('itemListsController', ['$scope', function($scope) {
		inititalizeBottomItems().then((result)=>{
			console.log("initializing bottom line items...")

			result.sort((a,b)=>{
				return(a.profit>b.profit)? -1: (a.profit<b.profit) ? 1: 0;
			});
			$scope.allItems = result;
			$scope.$digest();
			$(".spinner").css("display","none");
			$scope.openModal = (id) =>{
				$(".modal-iframe").attr("src",`http://landonrepp.com/client/index.html?id=${id}`);
				$(".modal").css("display","block");
			}
		});
	}]);
	$(".modal").on("click",()=>{
		$(".modal-iframe").attr("src","");
		$(".modal").css("display","none");
	});
	
	$(".lineItemHeader > .lineItemInfo").click((e)=>{
		var headerIDS = ["#nameHead","#buyHead","#sellHead","#profitHead"];
		var tempStr = $(`${$(this).attr("id")} > .sort`).html();
		alert(this.id);
		for(var i in headerIDS){
			$(`${headerIDS[i]} > .sort`).html("&#9658;");
		}
		if(tempStr == "&#9658;"){
			tempStr = "&#9660;";
		}
		else if(tempStr == "&#9660;"){
			tempStr = "&#9650;"
		}
		else{
			tempStr = "&#9660;";
		}
		$(`${$(this).attr("id")} > .sort`).html(tempStr);
	}).children().on("click", function(e) {
		e.stopPropagation();
	});

	function inititalizeBottomItems(){
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:`/hotItems`,
				success:function(json){
					itemArr = json;
					resolve(json);
				},
				error:function(){
					reject("err");
					alert("err");
				}
			});
		}).then((result)=>{
			result = JSON.parse(result);
			promArray = [];
			groupedItemsArr = []
			for(var i = 0;i<result.length;i+=200){
				groupedItemsArr.push(result.slice(i,Math.min(i+200,result.length)));
			}
			groupedItemsArr.forEach((item) => {
				promArray.push(new Promise((resolve,reject)=>{
					item= item.slice(item).toString().replace(" ","");
					$.ajax({
						url:`https://api.guildwars2.com/v2/commerce/prices?ids=${item}`,
						success:function(json){
							$.ajax({
								url:`https://api.guildwars2.com/v2/items?ids=${item}`,
								success:function(dt){
									for(i in dt){
										for(j in dt[i]){
											json[i][j] = dt[i][j];
										}
										json[i]["buys"]["unit_price"] = Math.round(json[i]["buys"]["unit_price"]/10)/1000;
										json[i]["sells"]["unit_price"] = Math.round(json[i]["sells"]["unit_price"]/10)/1000;
										json[i]["profit"] = (Math.round((json[i]["sells"]["unit_price"]*.85- json[i]["buys"]["unit_price"])*1000))/1000;
									}
									resolve(json);
								},
								error:function(){
									alert("internal ajax call err");
									reject(json);
									// return json;
									
								}
							});
						},
						error:function(){
							reject("err");
							console.log("err")
							// alert("err");
						}
					});
				})
				);
			});
			return Promise.all(promArray).then((values)=>{
				// console.log(values.flat());
				return values.flat();
			});
		});
	}
});