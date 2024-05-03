import { Component } from '@angular/core';

@Component({
  selector: 'app-inneraction-cell-renderer',
  templateUrl: './inneraction-cell-renderer.component.html',
  styleUrl: './inneraction-cell-renderer.component.css'
})
export class InneractionCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  downLoadRow(): void {
    this.params.editRow(this.params.data.id);
  }

  deleteRow(): void {
    this.params.deleteRow(this.params.data.id);
  }
}
