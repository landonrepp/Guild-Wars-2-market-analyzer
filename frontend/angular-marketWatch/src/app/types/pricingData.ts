import { Injectable } from '@angular/core';

// tslint:disable-next-line:class-name
@Injectable({
  providedIn: 'root'
})
export class PricingData {
    id: number;
    whitelisted: boolean;
    buys: subPriceData = new subPriceData();
    sells: subPriceData = new subPriceData();
}
class subPriceData{
  unit_price:number;
  quantity: number;
}
