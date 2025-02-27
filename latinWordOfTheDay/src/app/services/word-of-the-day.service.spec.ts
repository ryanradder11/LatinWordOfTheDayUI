import { TestBed } from '@angular/core/testing';

import { WordOfTheDayService } from './word-of-the-day.service';

describe('WordOfTheDayService', () => {
  let service: WordOfTheDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordOfTheDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
