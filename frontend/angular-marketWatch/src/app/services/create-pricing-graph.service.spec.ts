import { TestBed } from '@angular/core/testing';

import { CreatePricingGraphService } from './create-pricing-graph.service';

describe('CreatePricingGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatePricingGraphService = TestBed.get(CreatePricingGraphService);
    expect(service).toBeTruthy();
  });
});
