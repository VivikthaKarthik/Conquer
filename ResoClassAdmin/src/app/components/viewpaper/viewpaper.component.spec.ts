import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpaperComponent } from './viewpaper.component';

describe('ViewpaperComponent', () => {
  let component: ViewpaperComponent;
  let fixture: ComponentFixture<ViewpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewpaperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
