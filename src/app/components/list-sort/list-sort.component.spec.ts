import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSortComponent } from './list-sort.component';

describe('ListSortComponent', () => {
  let component: ListSortComponent;
  let fixture: ComponentFixture<ListSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSortComponent]
    });
    fixture = TestBed.createComponent(ListSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
