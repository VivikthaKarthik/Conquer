import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridApi, GridOptions } from 'ag-grid-community';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  colDefs: ColDef[] = [
    {
      headerName: 'Actions',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        editRow: (id: any) => this.editRow(id),
        deleteRow: (id: any) => this.deleteRow(id),
      },
    },
    { headerName: 'ID', field: 'id', filter: 'agTextColumnFilter' },
    { headerName: 'Course', field: 'name', filter: 'agTextColumnFilter' },
    {
      headerName: 'Thumbnail',
      field: 'thumbnail',
      filter: 'agTextColumnFilter',
    },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };

  editRow(id: number): void {
    alert();
  }

  deleteRow(id: number): void {}

  gridOptions!: GridOptions;
  gridApi!: GridApi;
  @Input() courseList: any[] = [];

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog
  ) {
    (this.gridOptions = {
      onGridReady: (params) => {
        this.gridApi = params.api;
      },
    }),
      (this.gridOptions = {
        pagination: true,
        paginationPageSize: 5, // Number of rows per page
        onPaginationChanged: this.onPaginationChanged.bind(this),
      });
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
}
