import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridApi, GridOptions } from 'ag-grid-community';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})

export class GridComponent {
  @Output() editRecord = new EventEmitter();
  @Output() deleteRecord = new EventEmitter();
  @Input() data: any[] = [];
  @Input() coloumnDef: any[] = [];
  gridOptions!: GridOptions;
  gridApi!: GridApi;
  gridColumns: ColDef[] = [];
  defaultColDef:any = {};

  constructor() {
    //Set onGridReady Event
    this.gridOptions = {
      onGridReady: (params) => {
        this.gridApi = params.api;
        params.api.sizeColumnsToFit();
      },
    };

    //Set onPaginationChanged Event
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 5, // Number of rows per page
      onPaginationChanged: this.onPaginationChanged.bind(this),
    };

    //Add Default Column with Edit and Delete Buttons
    this.gridColumns.push({
      headerName: 'Actions',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        editRow: (id: any) => this.editRow(id),
        deleteRow: (id: any) => this.deleteRow(id),
      },
    });

    //Add Default Column Definition
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
    };
  }

  ngOnInit(): void {
    //Add Grid Columns after Default Column
    this.gridColumns = this.gridColumns.concat(this.coloumnDef);
  }

  onPaginationChanged(event: any) {
    console.log('Current page:', event.api.paginationGetCurrentPage() + 1);
  }

  getRowHeight(params: any) {
    const DEFAULT_ROW_HEIGHT = 25;
    const lineHeight = 20;
    const numberOfLines =
      (params.data.make + params.data.model + params.data.price).length / 40;
    return DEFAULT_ROW_HEIGHT + numberOfLines * lineHeight;
  }
  
  editRow(id: number): void {
    this.editRecord.emit(id);
  }

  deleteRow(id: number): void {
    this.deleteRecord.emit(id);
   }

}