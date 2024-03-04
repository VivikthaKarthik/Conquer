import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Course } from '../../models/course';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ColDef } from 'ag-grid-community';
import { GridApi, GridOptions } from 'ag-grid-community';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  gridOptions!: GridOptions;
  gridApi!: GridApi;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private dialog: MatDialog
  ) {
    this.gridOptions = {
      onGridReady: (params) => {
        this.gridApi = params.api;
      }
    },
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 5, // Number of rows per page
      onPaginationChanged: this.onPaginationChanged.bind(this)
    };
  }
  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  // Example method to handle pagination changes
  onPaginationChanged(event: any) {
    console.log('Current page:', event.api.paginationGetCurrentPage() + 1);
  }
  // ag-grid-Begin
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true, filter: true
  }
  courseList: any[] = [];
  colDefs: ColDef[] = [
    // { headerName: 'Actions', cellRenderer: ActionsrenderComponent },
    {
      headerName: 'Actions', cellRenderer: (params: any) => {
        return `
        <button class="btn edit m-r-5" style="color:blue" (click)="editRow(${params.data.id});" data-toggle="modal"
        data-target="#edit_course"
         type="button">
        <i class="fa fa-pencil"></i>
      </button>
      <button class="btn delete m-r-5" style="color:red" (click)="deleteRow();" type="button">
        <i class="fa fa-trash-o"></i>
      </button>
        `;
      }
    },
    { headerName: 'ID', field: "id", filter: 'agTextColumnFilter' },
    { headerName: 'Course', field: "name", filter: 'agTextColumnFilter' },
    { headerName: 'Thumbnail', field: "thumbnail", filter: 'agTextColumnFilter' },


  ];
  edit(){
    debugger
    alert("HI");
  }
  editRow(id:number) {
    debugger
    alert("HI");
    debugger
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      const id = selectedRows[0].id;
      // Handle edit action with the row ID
      alert('Edit clicked for ID:'+ id);
    }
  }

  // Delete function triggered by button click
  deleteRow() {
    debugger
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const id = selectedNodes[0].data.id;
      // Handle delete action with the row ID
      alert('Delete clicked for ID:'+ id);
    }
  }


  // Custom method to dynamically calculate row height based on content
  getRowHeight(params: any) {
    const DEFAULT_ROW_HEIGHT = 25; // Default row height
    const lineHeight = 20; // Adjust this value based on your font size and line height

    // Calculate height based on number of lines in the content
    const numberOfLines = (params.data.make + params.data.model + params.data.price).length / 40;
    return DEFAULT_ROW_HEIGHT + (numberOfLines * lineHeight);
  }

  courses: Course[] | undefined;
  courseName: string = '';
  courseId: any;

  
  // ag-grid-end

  

  ngOnInit(): void {
    //this.getAllCourses();
    this.getAllCoursesAG();

  }

  getAllCoursesAG() {
    debugger
    this.masterService.getAll('Course', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.courseList = data.result;
        } else {
          alert(data.message);
        }
      });
  }


  getAllCourses() {
    this.masterService.getAll('Course', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.courses = this.dataMappingService.mapToModel<Course>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
            })
          );
        } else {
          alert(data.message);
        }
      });
  }

  editCourse(cId: any) {
    this.courseId = cId;
    this.masterService
      .getById(cId, 'Course', 'Get')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.courseName = data.result.name;
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
  }

  createCourse() {
    var objCourse = {
      name: this.courseName,
      thumbnail: "course ThumbNail"
    }
    this.masterService.post(objCourse, 'Course', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllCourses();
        } else {
          alert(data.message);
        }
      });
  }

  updateCourse() {
    var objCourse = {
      id: this.courseId,
      name: this.courseName,
      thumbnail: "Course Thumbnail"
    }
    this.masterService.put(objCourse, 'Course', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllCourses();
        } else {
          alert(data.message);
        }
      });
  }

  deleteCourse(cId: any) {

    this.masterService
      .delete(cId, 'Course', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllCourses();
        } else {
          alert(data.message);
        }
      });
  }

  confirmDelete(id: any): void {
    debugger
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result) {

        this.deleteCourse(id);
      } else {

      }
    });

  }

  showConfirmation(id: any): void {
    Swal.fire({

      text: 'Do you really want to remove this course/class?',
      icon: 'warning',
      showCancelButton: true,

      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCourse(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {
    debugger
    const file: File = event.target.files[0];
    if (file) {
      // Call the service method to read Excel file
      // this.excelService.readExcelFile(file);
      // // If you need to upload the file to a backend
      // this.excelService.uploadExcelFile(file,'Course', 'Upload');
      const formData = new FormData();
      formData.append('file', file);
      this.masterService.post(formData, 'Course', 'Upload')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            alert(data.result);
            this.getAllCourses();
          } else {
            alert(data.message);
          }
        });
    }
    else {
      alert("Please select a File!")
    }
  }



}

