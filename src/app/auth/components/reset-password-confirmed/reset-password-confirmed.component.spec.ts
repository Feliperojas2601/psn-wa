import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmedComponent } from './reset-password-confirmed.component';

describe('ResetPasswordConfirmedComponent', () => {
  let component: ResetPasswordConfirmedComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
