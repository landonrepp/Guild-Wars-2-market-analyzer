
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
Array.prototype.peek = function() {
    return this[this.length - 1];
}
function mean(arr){ //gets the mean of an array of integers
    sum = 0;
    for(var i = 0; i<arr.length;i++){
        sum = sum + arr[i];
    }

    return Math.round(sum/arr.length*100)/100;
}

function openModal(id){
    alert(id);
    $(".modal-iframe").attr("src",`http://landonrepp.com/client/index.html?id=${id}`);

}

function movingAvg(arr){
    var avg = []
    sum = 0;
    for(var i = 0;i<arr.length;i++){
        if(i>=10){
            sum -= arr[i-10];
        }
        sum+= arr[i];
        avg.push(sum/Math.min(i,10));
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function stdDeviation(arr){
    var sum = 0;
    var m = mean(arr);
    for(var i = 0; i<arr.length;i++){
        sum += (arr[i]-m)*(arr[i]-m);
    }
    return Math.round(Math.sqrt(sum/(arr.length-1))*100)/100;
}
function frequency(arr){
    var obj = new Object();
    for(var i in arr){
        if(typeof(obj[arr[i]]) == "undefined"){
            obj[arr[i]] = 1;
        }
        else{
            obj[arr[i]]++;
        }
    }
    sortObject(obj);
    tempArr = [[],[]];
    for(var i in obj){
        tempArr[0].push(i);
        tempArr[1].push(obj[i]);
    }

    for(var i in tempArr[0]){
        tempArr[0][i] = parseInt(tempArr[0][i])
    }

    return(tempArr);
}
function union(arr1,arr2){
    let a = new Set(arr1);
    let b = new Set(arr2);
    let un = new Set([...a, ...b]);
    return Array.from(un);
}

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function rangeArr(arr){

    max = Math.max(...arr);
    min = Math.min(...arr);
    range = max-min;
    tempArr = [];
    for(var i = min;i<=max;i+=range/6){
        tempArr.push(i);
    }
    return tempArr;
}

function parseData(data){
    const investmentGold = 1000 * 100;
    var tempArr = [[],[],[]]; //2d array holds dates,buy orders, sell orders
    console.log(data)
    for(var i = 0; i<data.length;i++){
            tempArr[0].push(data[i]["time"])
            tempArr[1].push(data[i]["buyPrice"])
            tempArr[2].push(data[i]["sellPrice"])
    }
    console.log(tempArr)
    return tempArr;
}

function timeTable(arr,ID){
    tempArr = rangeArr(arr[0]);
    arr[0].unshift("x1");
    arr[1].unshift("data1");
    arr[2].unshift("data2");
    tempArr.unshift("x1");
    var chart = {
        bindto:ID,
        data:{
            x:"x1",
            xFormat: '%Y-%m-%d %H:%M',
            xs:{
                data1:"Buy Orders",
                data2:"Sell Orders"
            },
            columns : [
                arr[0].slice(),
                arr[1].slice(),
                arr[2].slice(),
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    // 2019-03-16 02:28
                    format: '%Y-%m-%d %H:%M',
                    rotate: 75,
                    multiline: false,
                    values:createTicks(tempArr.slice(1,tempArr.length),6)
                }
            }
        },
        point: {
            show: false
        },
        padding: {
            right: 20
        }
    };
    c3.generate(chart);
    arr[0].shift();
    arr[1].shift();
    arr[2].shift();
    return chart;
}
function timeTableWithAvg(chart,id){
    var avgArr = ["Average price"];
    var buyArr = chart["data"]["columns"][1];
    var sellArr = chart["data"]["columns"][2];

    for(var i = 1; i<buyArr.length;i++){
        avgArr.push((buyArr[i]+sellArr[i])/2);
    }
    chart["data"]["columns"].push(avgArr);
    chart["bindto"] = id;
    c3.generate(chart);
    return chart;
}


function dualFrequencyTable(arr,id,xAxis1,xAxis2,weighted){
    // weighted is an optional boolean param
    if(typeof(weighted) == "undefined"){
        weighted = false;
    }
    var freq1 = frequency(arr[1]);
    var freq2 = frequency(arr[2]);

    freq1[0].unshift("x1");
    freq2[0].unshift("x2");
    freq1[1].unshift("data1");
    freq2[1].unshift("data2");

    var chart ={
        bindto:id,
        spline: { interpolation: { type: 'monotone' } },
        data:{
            xs:{
                data1:"x1",
                data2:"x2"
            },
            names:{
                data1:xAxis1,
                data2:xAxis2
            },
            columns:[
                freq1[0],
                freq2[0],
                freq1[1],
                freq2[1]
            ],
            type:"area-spline"
        },
        grid:{
            x:{
                lines:[
                    {value:arr[1].peek(),text:"current buy price",position:"middle"},
                    {value:arr[2].peek(),text:"current sell price",position:"middle"}
                ]
            },
        },
        padding: {
            right: 20
        }
    };
    // chart["xs"][xAxis1] = "x1"
    // chart["xs"][xAxis2] = "x2"
    c3.generate(chart);
    return chart;
}
function frequencyTable(arr,id,xAxis){
    var tempArr = frequency(arr);
    tempArr[0].unshift("x");
    tempArr[1].unshift(xAxis);
    var chart = {
        bindto: id,
        spline: { interpolation: { type: 'monotone' } },
        data:{
            // type: 'spline',
            x:"x",
            columns : [
                tempArr[0],
                tempArr[1]
            ],
            types:{

            },
            axis:{
                x:{
                    type:"category",
                    tick:{
                        rotate:75,
                        multiline:false
                    },
                    height:130
                }
            }
        }
    };
    chart["data"]["types"][xAxis] = 'area-spline';
    c3.generate(chart);
    return chart;
}
function createTicks(arr,ticks){
    max = Math.max(...arr);
    min = Math.min(...arr);
    tempArr = [];
    for(var i = min;i<=max;i+=(max-min)/6){
        tempArr.push(i);
    }
    return tempArr;
}
$(document).ready(()=>{
    urlParams = getUrlVars();
    $.ajax({
        url:`https://api.guildwars2.com/v2/items?id=${urlParams["id"]}`,
        success:function(json){
            $(".itemImg").attr("src",json["icon"]);
            $(".itemDesc").html(json["description"]);
            $(".itemName").html(json["name"]);
        },
        error:function(){
            alert("Error");
        }
   });

    $.ajax(`/calc/${urlParams["id"]}`, {
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        cache: "no-cache",

        success: function(response) {
            dataObj = response;

            dataArr = parseData(response);
            var tTbl = timeTable(dataArr,"#timeTable");
            timeTableWithAvg(tTbl,"#buySellAvg");
            dualFrequencyTable(dataArr.slice(),"#dualFrequencyTable","Buy orders dist.","Sell orders dist.");

            // set second row
            $("#buyStatsContainer .mean").html(`Buy order mean: ${mean(dataArr[1])}`);
            var buyStdDev = stdDeviation(dataArr[1]);
            $("#buyStatsContainer .variance").html(`Buy order variance: ${Math.round(buyStdDev*buyStdDev*100)/100}`);
            $("#buyStatsContainer .stdDeviation").html(`Buy order std deviation:  ${buyStdDev}`);

            var sellStdDev = stdDeviation(dataArr[2]);
            $("#sellStatsContainer .mean").html(`Sell order mean: ${mean(dataArr[2])}`);
            $("#sellStatsContainer .variance").html(`Sell order variance: ${Math.round(sellStdDev*sellStdDev*100)/100}`);
            $("#sellStatsContainer .stdDeviation").html(`Sell order std deviation:  ${sellStdDev}`);

            $(".currentMargin").html(`Current Margins: ${dataArr[2].peek()-dataArr[1].peek()}`);
            $(".currentROI").html(`Current return on investment(ROI) per item: ${Math.round(dataArr[2].peek()-dataArr[1].peek()*1.15)}`);
            $(".currentROIUndercut").html(`Current ROI with a 1 copper undercut: ${Math.round(dataArr[2].peek()-dataArr[1].peek()*1.15-2)}`);

        },
        error: function() {
            $("#container div").html("request no. 1 have failed");
        }

    });
    // current market data
    $.ajax({
        url:`https://api.guildwars2.com/v2/commerce/listings?id=${urlParams["id"]}`,
        success:function(json){
            var buyOrders = ["current Buy Orders"];
            var sellOrders = [];

            for(var i = 0; i<json["buys"].length;i++){
                buyOrders.push(json["buys"][i]["listings"]);
                sellOrders.push(json["sells"][i]);
            }

            c3.generate({
                bindto:"#pumpAndDump",
                data:{
                    columns:[
                        buyOrders
                    ]
                }
            });
        },
        error:function(){
            alert("Error2");
        }
    })
});