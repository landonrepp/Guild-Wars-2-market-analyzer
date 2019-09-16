import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingDataWithSidebarComponent } from './pricing-data-with-sidebar.component';

describe('PricingDataWithSidebarComponent', () => {
  let component: PricingDataWithSidebarComponent;
  let fixture: ComponentFixture<PricingDataWithSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingDataWithSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingDataWithSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
