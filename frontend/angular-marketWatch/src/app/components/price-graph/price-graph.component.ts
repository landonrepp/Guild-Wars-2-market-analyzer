import { Component, OnInit, Input } from '@angular/core';
import * as c3 from '../../scripts/c3.js';
import * as jquery from '../../scripts/jquery.js';
import {CurrentPricesService} from '../../services/current-prices.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import {ItemData} from '../../types/itemData';
import { PricingData } from '../../types/pricingData';



function movingAvg(arr){
  var avg = []
  let sum = 0;
  for(var i = 0;i<arr.length;i++){
      if(i>=10){
          sum -= arr[i-10];
      }
      sum+= arr[i];
      avg.push(sum/Math.min(i+1,10));
  }
  return avg
}

function createTicks(arr:any[],ticks:number):any[]{
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  let tempArr = [];
  for(var i = min;i<=max;i+=(max-min)/6){
      tempArr.push(Math.floor(i));
  }
  return tempArr;
}

declare global{
  interface String{
    replaceAt(index:any,replacement:any);
  }
  interface Array<T>{
    peek();
  }
}
String.prototype.replaceAt = function (index:number, replacement:string) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
Array.prototype.peek = function() {
  return this[this.length - 1];
}

function stdDeviation(arr:number[]):number{
  var sum = 0;
  var m = mean(arr);
  for(var i = 0; i<arr.length;i++){
      sum += (arr[i]-m)*(arr[i]-m);
  }
  return Math.round(Math.sqrt(sum/(arr.length-1))*100)/100;
}

function frequency(arr:number[]):number[][]{
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
  let tempArr = [[],[]];
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
  let un = new Set([...arr1, ...arr2]);
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

  let max = Math.max(...arr);
  let min = Math.min(...arr);
  let range = max-min;
  let tempArr = [];
  for(var i = min;i<=max;i+=range/6){
      tempArr.push(i);
  }
  return tempArr;
}

function parseData(data){
  const investmentGold = 1000 * 100;
  var tempArr = [[],[],[]]; //2d array holds dates,buy orders, sell orders
  for(var i = 0; i<data.length;i++){
          tempArr[0].push(data[i]["time"]);
          tempArr[1].push(data[i]["buyPrice"]);
          tempArr[2].push(data[i]["sellPrice"]);
  }
  return tempArr;
}

// takes a time array, buy orders, and sell orders, and returns an object that can be used with c3.generate.
function timeTable(ID:string,time:string[],buy:any[],sell:any[],xAxis1,xAxis2):object{
  let tempArr = rangeArr(time);
  time.unshift("x1");
  buy.unshift("data1");
  sell.unshift("data2");
  var chart = {
    bindto:ID,
    // position: 'inset',
    // legend: {
    //   show: true,
    //   position: 'inset',
    //   inset: {
    //       anchor: 'bottom-left',
    //       x:0,
    //       y: 0,
    //       step: 1
    //   }
    // },
    data:{
        x:"x1",
        xFormat: '%Y-%m-%d %H:%M',
        xs:{
          data1:"x1",
          data2:"x2"
        },
        names:{
            data1: xAxis1,
            data2: xAxis2
        },
        columns : [
          time.slice(),
          buy.slice(),
          sell.slice()
        ]
        
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                // 2019-03-16 02:28
                format: '%Y-%m-%d',
                rotate: 25,
//                    values:time.slice(1,arr.length)
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
  time.shift();
  buy.shift();
  sell.shift();
  return chart;
}
function timeTableWithAvg(chart,id){
  var avgArr = ["Average price"];
  var buyArr = chart["data"]["columns"][1];
  var sellArr = chart["data"]["columns"][2];

  for(var i = 1; i<buyArr.length;i++){
      avgArr.push(String((buyArr[i]+sellArr[i])/2));
  }
  var newAvg = ["Moving Average"].concat(movingAvg(avgArr.slice(1,avgArr.length-1)))
  chart["data"]["columns"].push(newAvg);
  // chart["data"]["columns"].push(avgArr);
  chart["bindto"] = id;
  c3.generate(chart);

  return chart;
}
function mean(arr:number[]):number{ //gets the mean of an array of integers
  let sum = 0;
  for(var i = 0; i<arr.length;i++){
      sum = sum + arr[i];
  }
  return Math.round(sum/arr.length*100)/100;
}

function dualFrequencyTable(id,buys,sells,xAxis1,xAxis2,weighted){
  // weighted is an optional boolean param
  if(typeof(weighted) == "undefined"){
      weighted = false;
  }
  var freq1 = frequency(buys);
  var freq2 = frequency(sells);

  // need to reimplement this in pure d3 so the typing is consistent. 
  // @ts-ignore
  freq1[0].unshift("x1");
  // @ts-ignore
  freq2[0].unshift("x2");
  // @ts-ignore
  freq1[1].unshift("data1");
  // @ts-ignore
  freq2[1].unshift("data2");

  var chart ={
      bindto:id,
      position: 'inset',
      // legend: {
      //   show: true,
      //   position: 'inset',
      //   inset: {
      //       anchor: 'top-left',
      //       x:0,
      //       y: 0,
      //       step: 0
      //   }
      // },
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
      axis:{
          x:{
              tick: {
  //                multiline: false,
                  values: createTicks(freq1[0].slice(1,freq1[0].length-1).concat(freq2[0].slice(1,freq2[0].length-1)),6)
              },
          }
      },
      grid:{
          x:{
              lines:[
                  {value:buys.peek(),text:"current buy price",position:"middle"},
                  {value:sells.peek(),text:"current sell price",position:"middle"}
              ]
          },
      },
      padding: {
          right: 20
      }
  };
  // chart["xs"][xAxis1] = "x1"
  // chart["xs"][xAxis2] = "x2"
  return chart;
}
function frequencyTable(arr,id,xAxis){
  var tempArr = frequency(arr);
  // @ts-ignore
  tempArr[0].unshift("x");
  tempArr[1].unshift(xAxis);
  var chart = {
      bindto: id,
      position: 'inset',
      legend: {
        show: true,
        position: 'inset',
        inset: {
            anchor: 'top-left',
            x:0,
            y: 0,
            step: 0
        }
      },
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
                  type:"timeseries",
                  tick:{
                      
                  }
              }
          }
      }
  };
  chart["data"]["types"][xAxis] = 'area-spline';
  return chart;
}
function getWidth(elem) {
  return elem.clientWidth;
}

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})


export class PriceGraphComponent implements OnInit {
  @Input() itemID:number;
  mean = function(arr:number[]):number{
    return mean(arr);
  }
  stdDeviation = function(arr:number[]):number{
    return stdDeviation(arr);
  }
  // get math functions in the html
  selectedItem:number = 24;
  math = Math;
  loading:boolean = true;
  item:ItemData = new ItemData();
  buyData:number[] = [];
  sellData:number[] = [];
  timeData:string[] = [];
  curPrice:PricingData = new PricingData();
  tTable = new Object();
  fTable = new Object();
  constructor(private http:CurrentPricesService) { }
  createGraph = function(){
    this.http.getMarketHistory(this.itemID).subscribe(data=>{
      const parsedData = parseData(data);
      this.timeData = parsedData[0];
      this.buyData = parsedData[1];
      this.sellData = parsedData[2];
      // console.log(this.buyData);
      // console.log(this.sellData);
      // console.log(this.timeData);
      this.loading=false;
      this.tTable = timeTable('#timeTable',this.timeData,this.buyData,this.sellData,"Buy Orders Price","Sell Orders Price");
      this.fTable = dualFrequencyTable('#dualFrequencyTable',this.buyData,this.sellData,'Buy Orders Freq.','Sell Orders Freq.',false);
      c3.generate(this.tTable);
      c3.generate(this.fTable);
    });
    this.http.getItemData([this.itemID]).subscribe(data=>{
      this.item = data[0][0];
      
    });
    this.http.getPricingData([this.itemID]).subscribe(data=>{
      this.curPrice = data[0][0];
    });
  }
  ngOnChanges(){
    this.loading=true;
    if(this.item){
      this.createGraph();
    }
  }
  ngOnInit() {
    this.loading=true;
    if(this.item){
      this.createGraph();
    }
  }

}
