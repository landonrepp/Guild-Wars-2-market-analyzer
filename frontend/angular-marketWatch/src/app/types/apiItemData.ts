import { Injectable } from '@angular/core';
import { ItemData } from './itemData';

@Injectable({
  providedIn: 'root'
})
export class apiItemData {
  "name":string;
  "itemsID":number;
  "buyPrice":number;
  "sellPrice":number;
  "buyQuantity":number;
  "sellQuantity":number;
  "investmentScore":number;
  "itemData":ItemData;
}