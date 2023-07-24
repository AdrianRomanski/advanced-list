import {Component, DestroyRef, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, skip} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ListSort} from "../../model/list.model";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-list-sort',
  templateUrl: './list-sort.component.html',
  styleUrls: ['./list-sort.component.scss']
})
export class ListSortComponent implements OnInit{
  destroyRef = inject(DestroyRef)

  @Output()
  sortChangeClicked = new EventEmitter<ListSort>;

  listSort$ = new BehaviorSubject<ListSort>({ascending: true});

  ngOnInit(): void {
    this.listSort$.pipe(
      skip(1),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
     ).subscribe((listSort: ListSort) => {
      this.sortChangeClicked.emit(listSort);
    })
  }

  onToggle({value}: MatRadioChange) {
    this.listSort$.next({ascending: JSON.parse(value)});
  }
}
