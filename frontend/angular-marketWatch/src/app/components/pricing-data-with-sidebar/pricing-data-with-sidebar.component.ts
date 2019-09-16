import { Component, OnInit } from '@angular/core';
import { apiItemData } from 'src/app/types/apiItemData';
import { CurrentPricesService } from 'src/app/services/current-prices.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-pricing-data-with-sidebar',
  templateUrl: './pricing-data-with-sidebar.component.html',
  styleUrls: ['./pricing-data-with-sidebar.component.css']
})
export class PricingDataWithSidebarComponent implements OnInit {
  apiData:apiItemData[] = [];
  itemIDs: number[] = [];
  selectedItem:number = 24;
  
  loadLineItems(searchKey){
    this.http.getSidebarLines(searchKey).subscribe(items=>{
      this.apiData = items;
      items.forEach(item =>{
        this.itemIDs.push(item.itemsID);
      });
      this.http.getItemData(this.itemIDs).subscribe(items=>{
        let counter:number = 0;
        for(var i = 0;i<items.length;i++){
          for(var j = 0; j<items[i].length; j++){
            if(this.apiData[counter].itemsID == items[i][j].id){
              this.apiData[counter].itemData = items[i][j];
              counter++;
            }
          }
        }
      });
    });
  }
  createGraph(itemID){
    this.selectedItem=itemID;
  }
  searchLines(event){
    this.loadLineItems(event)
  }
  constructor(private http: CurrentPricesService) { }

  ngOnInit() {
    this.loadLineItems("");
  }
}
