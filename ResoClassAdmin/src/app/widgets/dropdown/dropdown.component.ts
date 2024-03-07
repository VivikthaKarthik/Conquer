import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  input,
} from '@angular/core';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() label: string | undefined;
  @Input() options: ListItem[] | undefined;
  @Output() dropdownOnChange = new EventEmitter();
  data: any = [
    {
      options: [],
    },
  ];

  update(key: string, event: Select2UpdateEvent<any>) {
    this.dropdownOnChange.emit(event.value);
  }

  ngOnInit() {
    // this.data[0].options.push(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data[0].options = [];
    this.options?.forEach((item) => {
      this.data[0].options.push({ value: item.id, label: item.name });
    });
  }
}
