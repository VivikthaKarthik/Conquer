import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubtopicComponent } from './editsubtopic.component';

describe('EditsubtopicComponent', () => {
  let component: EditsubtopicComponent;
  let fixture: ComponentFixture<EditsubtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditsubtopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsubtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
