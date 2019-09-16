import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingDataLineItemComponent } from './pricing-data-line-item.component';

describe('PricingDataLineItemComponent', () => {
  let component: PricingDataLineItemComponent;
  let fixture: ComponentFixture<PricingDataLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingDataLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingDataLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
