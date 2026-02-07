import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { RandomComponent } from './random.component';

describe('RandomComponent', () => {
  let component: RandomComponent;
  let fixture: ComponentFixture<RandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomComponent, RouterTestingModule],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
