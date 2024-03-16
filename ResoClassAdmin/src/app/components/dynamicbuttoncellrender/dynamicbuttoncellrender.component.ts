import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamicbuttoncellrender',
  templateUrl: './dynamicbuttoncellrender.component.html',
  styleUrl: './dynamicbuttoncellrender.component.css',
})
export class DynamicbuttoncellrenderComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  viewRow(): void {
    this.params.viewRow(this.params.data.id);
  }
}
