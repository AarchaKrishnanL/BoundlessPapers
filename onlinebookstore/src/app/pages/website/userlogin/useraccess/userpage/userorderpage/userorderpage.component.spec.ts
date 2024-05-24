import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserorderpageComponent } from './userorderpage.component';

describe('UserorderpageComponent', () => {
  let component: UserorderpageComponent;
  let fixture: ComponentFixture<UserorderpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserorderpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserorderpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
