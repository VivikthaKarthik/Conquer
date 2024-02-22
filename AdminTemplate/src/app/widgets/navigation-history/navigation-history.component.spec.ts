import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationHistoryComponent } from './navigation-history.component';

describe('NavigationHistoryComponent', () => {
  let component: NavigationHistoryComponent;
  let fixture: ComponentFixture<NavigationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
