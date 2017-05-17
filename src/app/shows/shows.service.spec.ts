import { TestBed, inject } from '@angular/core/testing';

import { ShowsService } from './shows.service';

describe('ShowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowsService]
    });
  });

  it('should ...', inject([ShowsService], (service: ShowsService) => {
    expect(service).toBeTruthy();
  }));
});
