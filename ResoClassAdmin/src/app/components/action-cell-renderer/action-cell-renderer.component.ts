import { Component } from '@angular/core';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrl: './action-cell-renderer.component.css',
})
export class ActionCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  editRow(): void {
    alert('Common Component');
    this.params.editRow(this.params.data.id);
  }

  deleteRow(): void {
    this.params.deleteRow(this.params.data.id);
  }
}
