import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubtopicComponent } from './addsubtopic.component';

describe('AddsubtopicComponent', () => {
  let component: AddsubtopicComponent;
  let fixture: ComponentFixture<AddsubtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsubtopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddsubtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
