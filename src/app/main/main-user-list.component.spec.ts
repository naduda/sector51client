import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserListComponent } from './main-user-list.component';

describe('MainUserListComponent', () => {
  let component: MainUserListComponent;
  let fixture: ComponentFixture<MainUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
