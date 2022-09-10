import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowsPage } from './shows.page';

describe('ShowsPage', () => {
  let component: ShowsPage;
  let fixture: ComponentFixture<ShowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
