import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCredentialsComponent } from './google-credentials.component';

describe('GoogleCredentialsComponent', () => {
  let component: GoogleCredentialsComponent;
  let fixture: ComponentFixture<GoogleCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
