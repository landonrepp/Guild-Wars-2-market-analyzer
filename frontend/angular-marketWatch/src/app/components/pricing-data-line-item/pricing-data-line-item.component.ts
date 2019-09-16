import { Component, OnInit, Input } from '@angular/core';
import {ItemData} from '../../types/itemData';
import {PricingData} from '../../types/pricingData';


@Component({
  selector: 'app-pricing-data-line-item',
  templateUrl: './pricing-data-line-item.component.html',
  styleUrls: ['./pricing-data-line-item.component.css']
})

export class PricingDataLineItemComponent implements OnInit {
  @Input() priceData: PricingData; 
  @Input() data: ItemData;
  math = Math;
  constructor() { }

  ngOnInit() {
  }

}
