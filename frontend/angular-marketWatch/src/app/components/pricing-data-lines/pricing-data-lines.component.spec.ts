import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingDataLinesComponent } from './pricing-data-lines.component';

describe('PricingDataLinesComponent', () => {
  let component: PricingDataLinesComponent;
  let fixture: ComponentFixture<PricingDataLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingDataLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingDataLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
