import { Component, OnInit,ComponentFactoryResolver, Type, ViewContainerRef, ViewChild } from '@angular/core';
import {CurrentPricesService} from '../../services/current-prices.service';
import { PricingData } from '../../types/pricingData';
import {PricingDataLineItemComponent} from '../pricing-data-line-item/pricing-data-line-item.component';
import {PriceGraphComponent} from '../price-graph/price-graph.component';
import { ItemData } from 'src/app/types/itemData';


@Component({
  selector: 'app-pricing-data-lines',
  templateUrl: './pricing-data-lines.component.html',
  styleUrls: ['./pricing-data-lines.component.css'],
  entryComponents:[PriceGraphComponent]
})
export class PricingDataLinesComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  graphComponent = PriceGraphComponent;
  component: any;
  items: number[];
  lineItemPricing: PricingData[] = [];
  lineItemData: ItemData[] = [];
  constructor(private http: CurrentPricesService,private componentFactoryResolver: ComponentFactoryResolver) { }
  addComponent(componentClass: Type<any>,itemID:number):void {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.component = this.container.createComponent(componentFactory);
    this.component.instance.itemID = itemID;

    // Push the component so that we can keep track of which components are created
  }
  resortItems():void{
        if(this.lineItemPricing.length==this.lineItemData.length){
          // combine line item data and pricing to sort, then deconstruct back into their two original arrays
          let items = [];
          for(var i = 0;i<this.lineItemPricing.length;i++){
            items.push({'data':this.lineItemData[i],'pricing':this.lineItemPricing[i]});
          }
          items = items.sort(function(a,b){
            let x = a['pricing']['sells']['unit_price']*.85-a['pricing']['buys']['unit_price']; var y = b['pricing']['sells']['unit_price']*.85-b['pricing']['buys']['unit_price'];
            return (y-x);
          });
          this.lineItemData = [];
          this.lineItemPricing = [];
          for(var i = 0;i<items.length;i++){
            this.lineItemData.push(items[i]['data']);
            this.lineItemPricing.push(items[i]['pricing']);
          }
        }
  }
  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  onChildClick(e){
    e.stopPropigation();
  }
  removeComponent(e) {
    if(e.target.id != "modal" && e.target.id != "modal-background" && e.target.id != "x-button"){
      return;
    }
      this.container.remove(0);
      this.component = null;
  }
  ngOnInit() {
    this.http.getHotItems().subscribe(items => {
      this.items = items;
      this.http.getPricingData(items).subscribe(dataArr => {
        dataArr.map(data => {
          this.lineItemPricing.push(...data);
        });
        this.resortItems();
      });
      this.http.getItemData(items).subscribe(dataArr => {
        dataArr.map(data => {
          this.lineItemData.push(...data);
        });
        this.resortItems();
      });
    });

  }
}
