import { TestBed } from '@angular/core/testing';

import { InteractionService } from './services/interaction.service';

describe('InteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionService = TestBed.get(InteractionService);
    expect(service).toBeTruthy();
  });
});
