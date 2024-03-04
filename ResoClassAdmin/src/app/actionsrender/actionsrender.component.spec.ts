import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsrenderComponent } from './actionsrender.component';

describe('ActionsrenderComponent', () => {
  let component: ActionsrenderComponent;
  let fixture: ComponentFixture<ActionsrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsrenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
