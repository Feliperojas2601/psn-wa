import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorActionsComponent } from './creator-actions.component';

describe('CreatorActionsComponent', () => {
  let component: CreatorActionsComponent;
  let fixture: ComponentFixture<CreatorActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
