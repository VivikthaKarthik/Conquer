import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutsComponent } from './default-layouts.component';

describe('DefaultLayoutsComponent', () => {
  let component: DefaultLayoutsComponent;
  let fixture: ComponentFixture<DefaultLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultLayoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
