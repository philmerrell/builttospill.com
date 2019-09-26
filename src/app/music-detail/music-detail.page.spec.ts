import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicDetailPage } from './music-detail.page';

describe('MusicDetailPage', () => {
  let component: MusicDetailPage;
  let fixture: ComponentFixture<MusicDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
