import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookdetailsComponent } from './userbookdetails.component';

describe('UserbookdetailsComponent', () => {
  let component: UserbookdetailsComponent;
  let fixture: ComponentFixture<UserbookdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserbookdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserbookdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
