import { Url } from 'url';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemData {
    name: string;
    description: string;
    type: string;
    level: number;
    rarity: string;
    'vendor_value': number;
    'game_types': string[];
    flags: string[];
    restrictions: string[];
    id: number;
    'chat_link': string;
    icon: string;
    details: object;
}
