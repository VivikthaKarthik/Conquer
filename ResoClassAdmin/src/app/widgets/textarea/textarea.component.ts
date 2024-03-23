import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {
  @Input() label: string | undefined;
  @Input() id: string | undefined;
  @Input() value: string | undefined;
  @Input() control!: AbstractControl;
  @Input() submitted = false;
  @Input() ErrorMessage: string | undefined;
  @Input() PlaceHolder:string| undefined;

  update(event: any) {
    var value = (event.target as HTMLInputElement).value;
    if (value !== '') this.control.setValue(value);
    else this.control.setValue(undefined);
  }
}
