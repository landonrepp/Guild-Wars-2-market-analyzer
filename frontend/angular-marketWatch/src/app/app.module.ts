import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PricingDataLineItemComponent } from './components/pricing-data-line-item/pricing-data-line-item.component';
import { PricingDataLinesComponent } from './components/pricing-data-lines/pricing-data-lines.component';
import {CurrentPricesService} from './services/current-prices.service';
import { PriceGraphComponent } from './components/price-graph/price-graph.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { PricingDataWithSidebarComponent } from './components/pricing-data-with-sidebar/pricing-data-with-sidebar.component';
import { SidebarLineItemComponent } from './components/sidebar-line-item/sidebar-line-item.component';
import { HeaderComponent } from './common/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PricingDataLineItemComponent,
    PricingDataLinesComponent,
    PriceGraphComponent,
    LoadingScreenComponent,
    PricingDataWithSidebarComponent,
    SidebarLineItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CurrentPricesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
