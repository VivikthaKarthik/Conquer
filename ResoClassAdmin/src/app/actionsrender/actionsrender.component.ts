import { Component } from '@angular/core';

@Component({
  selector: 'app-actionsrender',
  templateUrl: './actionsrender.component.html',
  styleUrl: './actionsrender.component.css'
})
export class ActionsrenderComponent {
  agInit(params: any): void {
    // Access the row data using params.data
  }

  edit() {
    // Handle edit action
  }

  delete() {
    // Handle delete action
  }
}
