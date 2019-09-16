import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryData {
  "time": string;
  "buyQuant": number;
  "sellQuant":number;
  "buyPrice":number;
  "sellPrice":number;
}