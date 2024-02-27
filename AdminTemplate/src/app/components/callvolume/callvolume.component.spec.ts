import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallvolumeComponent } from './callvolume.component';

describe('CallvolumeComponent', () => {
  let component: CallvolumeComponent;
  let fixture: ComponentFixture<CallvolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallvolumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallvolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
