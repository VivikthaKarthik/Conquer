import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquestionbankComponent } from './addquestionbank.component';

describe('AddquestionbankComponent', () => {
  let component: AddquestionbankComponent;
  let fixture: ComponentFixture<AddquestionbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddquestionbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddquestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
