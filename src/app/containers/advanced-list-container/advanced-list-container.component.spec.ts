import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedListContainerComponent } from './advanced-list-container.component';

describe('AdvancedListContainerComponent', () => {
  let component: AdvancedListContainerComponent;
  let fixture: ComponentFixture<AdvancedListContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedListContainerComponent]
    });
    fixture = TestBed.createComponent(AdvancedListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
