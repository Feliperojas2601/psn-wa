import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrsComponent } from './userrs.component';

describe('UserrsComponent', () => {
  let component: UserrsComponent;
  let fixture: ComponentFixture<UserrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
