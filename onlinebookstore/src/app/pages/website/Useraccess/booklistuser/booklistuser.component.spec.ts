import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistuserComponent } from './booklistuser.component';

describe('BooklistuserComponent', () => {
  let component: BooklistuserComponent;
  let fixture: ComponentFixture<BooklistuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooklistuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooklistuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
