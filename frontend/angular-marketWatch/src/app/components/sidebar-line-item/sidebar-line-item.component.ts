import { Component, OnInit, Input } from '@angular/core';
import {apiItemData} from '../../types/apiItemData';
import * as globalData from '../../global.json';

@Component({
  selector: 'app-sidebar-line-item',
  templateUrl: './sidebar-line-item.component.html',
  styleUrls: ['./sidebar-line-item.component.css']
})
export class SidebarLineItemComponent implements OnInit {
  @Input() data: apiItemData;
  math = Math;
  gRes = globalData;
  constructor() { }

  ngOnInit() {
  }

}
