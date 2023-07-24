import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BrandFilter} from "../../model/list.model";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent {
  @Input()
  brandFilters: BrandFilter[] = [];
  @Input()
  loading: boolean = true;

  @Output()
  brandClicked: EventEmitter<string[]> = new EventEmitter<string[]>;

  onButtonToggled({value}: MatButtonToggleChange) {
    this.brandClicked.emit(value.flat());
  }
}
