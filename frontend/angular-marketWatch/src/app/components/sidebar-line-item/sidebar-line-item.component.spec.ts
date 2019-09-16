import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLineItemComponent } from './sidebar-line-item.component';

describe('SidebarLineItemComponent', () => {
  let component: SidebarLineItemComponent;
  let fixture: ComponentFixture<SidebarLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
