import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchapterComponent } from './editchapter.component';

describe('EditchapterComponent', () => {
  let component: EditchapterComponent;
  let fixture: ComponentFixture<EditchapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditchapterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditchapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
