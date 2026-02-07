import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Menubar } from 'primeng/menubar';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, Menubar],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize menu items on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.items).toBeDefined();
    expect(app.items!.length).toBe(4);
  });

  it('should have english labels on menu items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.items![0].englishLabel).toBe('Word of the Day');
    expect(app.items![1].englishLabel).toBe('Random Word');
    expect(app.items![2].englishLabel).toBe('Favorites');
    expect(app.items![3].englishLabel).toBe('Explore');
  });
});
