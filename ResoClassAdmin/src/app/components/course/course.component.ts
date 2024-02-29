import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Course } from '../../models/course';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  courses: Course[] | undefined;
  courseName: string = '';
  courseId: any;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCourses();

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

  showConfirmation(id:any): void {
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
    else{
      alert("Please select a File!")
    }
  }

  

}

