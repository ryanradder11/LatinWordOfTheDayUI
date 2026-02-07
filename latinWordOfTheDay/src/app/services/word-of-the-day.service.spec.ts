import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { WordOfTheDayService } from './word-of-the-day.service';

describe('WordOfTheDayService', () => {
  let service: WordOfTheDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(WordOfTheDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
