import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridApi, GridOptions } from 'ag-grid-community';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';
import { Router } from '@angular/router';
import { DynamicbuttoncellrenderComponent } from '../dynamicbuttoncellrender/dynamicbuttoncellrender.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  @Output() editRecord = new EventEmitter();
  @Output() deleteRecord = new EventEmitter();
  @Output() viewRecord = new EventEmitter();
  @Input() data: any[] = [];
  @Input() coloumnDef: any[] = [];
  @Input() showAnalysis: boolean = false;
  gridOptions!: GridOptions;
  gridApi!: GridApi;
  gridColumns: ColDef[] = [];
  defaultColDef: any = {};

  constructor(private router: Router) {
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
      paginationPageSize: 7, // Number of rows per page
      onPaginationChanged: this.onPaginationChanged.bind(this),
      suppressHorizontalScroll: false,
    };

    //Add Default Column Definition
    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      sortable: true,
      filter: true,
      suppressMovable: true,
    };
  }

  ngOnInit(): void {
    //Add Default Column with Edit and Delete Buttons
    if (!this.showAnalysis) {
      this.gridColumns.push({
        headerName: '',
        minWidth: 150,
        resizable: false,
        filter: false,
        cellRenderer: ActionCellRendererComponent,
        cellRendererParams: {
          editRow: (id: any) => this.editRow(id),
          deleteRow: (id: any) => this.deleteRow(id),
        },
      });
    }

    //Add Grid Columns after Default Column
    this.gridColumns = this.gridColumns.concat(this.coloumnDef);

    if (this.showAnalysis) {
      this.gridColumns.push({
        headerName: '',
        minWidth: 120,
        resizable: false,
        filter: false,
        cellRenderer: DynamicbuttoncellrenderComponent,
        cellRendererParams: {
          viewRow: (id: any) => this.viewRow(id),
        },
      });
    }
  }

  viewRow(id: any) {
    this.viewRecord.emit(id);
  }

  onPaginationChanged(event: any) {}

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
