import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Address} from "../../model/list.model";

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.scss']
})
export class ListAddressesComponent {
  @Input()
  addresses: Address[] = [];
  @Input()
  loading: boolean = true;

  @Output()
  deleteClicked = new EventEmitter<string>;

  onDeleteClicked(id: string) {
    this.deleteClicked.emit(id);
  }
}
