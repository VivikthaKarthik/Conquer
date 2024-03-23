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
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() label: string | undefined;
  @Input() id: string | undefined;
  @Input() options: ListItem[] | undefined;
  @Input() control!: AbstractControl;
  @Input() submitted = false;
  @Input() ErrorMessage: string | undefined;
  @Output() dropdownOnChange = new EventEmitter();

  // data: any = [
  //   {
  //     options: [{ value: 0, label: 'Select' }],
  //   },
  // ];

  update(selectedId: any) {
    if (selectedId > 0) {
      this.control.setValue(selectedId);
      this.dropdownOnChange.emit(selectedId);
    }
    else {
      this.control.setValue(undefined);
      this.dropdownOnChange.emit(undefined);
    }
  }

  ngOnInit() {
    // this.data[0].options.push(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.data[0].options = [];
    // this.options?.forEach((item) => {
    //   this.data[0].options.push({ value: item.id, label: item.name });
    // });
  }
}
