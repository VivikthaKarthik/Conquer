import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.css',
})
export class TextboxComponent {
  @Input() label: string | undefined;
  @Input() id: string | undefined;
  @Input() value: string | undefined;
  @Input() control!: AbstractControl;
  @Input() submitted = false;
  @Input() ErrorMessage: string | undefined;
  @Output() textboxOnChange = new EventEmitter();

  update(event: any) {
    var value = (event.target as HTMLInputElement).value;
    if (value !== '') this.textboxOnChange.emit(value);
    else this.textboxOnChange.emit(undefined);
  }
}
