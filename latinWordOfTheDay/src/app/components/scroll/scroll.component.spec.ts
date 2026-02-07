import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ScrollComponent } from './scroll.component';

describe('ScrollComponent', () => {
  let component: ScrollComponent;
  let fixture: ComponentFixture<ScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollComponent);
    component = fixture.componentInstance;
    component.wordOfTheDay = {
      id: '1', word: 'testum', definition: 'a test', pronunciation: 'tes-tum',
      origin: 'Latin', example0: '', example0_latin: '', example1: '', example1_latin: '',
      example2: '', example2_latin: '', synonyms: [], antonyms: [], image: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
