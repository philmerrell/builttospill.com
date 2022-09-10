import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LyricsModalComponent } from './lyrics-modal.component';

describe('LyricsModalComponent', () => {
  let component: LyricsModalComponent;
  let fixture: ComponentFixture<LyricsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricsModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LyricsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
