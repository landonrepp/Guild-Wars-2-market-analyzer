import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Headers } from '@angular/http';
import { Observable, forkJoin } from 'rxjs';
import {PricingData} from '../types/pricingData';
import { ItemData } from '../types/itemData';
import { HistoryData } from '../types/historyData';
import { apiItemData } from '../types/apiItemData';
var url = 'http://api.landonrepp.com';
@Injectable({providedIn: 'root'})
export class CurrentPricesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
      // 'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }

  // get line items
  public getHotItems(): Observable<number[]>{
    const items: Observable<number[]> = this.http.get<number[]>(`${url}/hotItems`);
    return items;
  }
  public getSidebarLines(searchString:string = ''): Observable<apiItemData[]>{
      let params = {
        'searchkey':searchString
      }
      console.log(params);
    const items: Observable<apiItemData[]> = this.http.post<apiItemData[]>(`${url}/sql/sppost/getSidebarLines`,params);
    return items;
  }
  public getPricingData(items: number[]): Observable<PricingData[][]> {
    const groupedItemsArr: Observable<PricingData[]>[] = [];
    for (let i = 0; i < items.length; i += 200) {
      const arrItemSlice: number[] = items.slice(i, Math.min(i + 200, items.length));
      const strItemSlice: string = arrItemSlice.toString();
      groupedItemsArr.push(this.http.get<PricingData[]>(`https://api.guildwars2.com/v2/commerce/prices?ids=${strItemSlice}`));
    }
    return forkJoin(...groupedItemsArr);
  }
  public getItemData(items: number[]): Observable<ItemData[][]> {
    const groupedItemsArr: Observable<ItemData[]>[] = [];
    for (let i = 0; i < items.length; i += 200) {
      const arrItemSlice: number[] = items.slice(i, Math.min(i + 200, items.length));
      const strItemSlice: string = arrItemSlice.toString();
      groupedItemsArr.push(this.http.get<ItemData[]>(`https://api.guildwars2.com/v2/items?ids=${strItemSlice}`));
    }
    return forkJoin(...groupedItemsArr);
  }
  public getMarketHistory(item:number):Observable<HistoryData[]>{
    let itemHistory:Observable<HistoryData[]> = this.http.get<HistoryData[]>(`${url}/calc/${item}`);
    return itemHistory;
  }
}
