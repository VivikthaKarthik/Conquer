import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Subject } from '../../models/subject';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Form,FormGroup,FormControl, Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subject: Subject[] | undefined;
  subjectName: string = '';
  subjectId: any;
  courseData: Course[] = [];
  isPopupVisible: any;
  selectedValue: string = "";
  isAddPopupVisible: boolean = true;

  constructor(
    private masterService: MasterService,private fb:FormBuilder,
    private dataMappingService: DataMappingService, private dialog: MatDialog
  ) { }

  

  subForm = this.fb.group({
    subjectName : new FormControl("",Validators.required)
  })

  ngOnInit(): void {
    this.getAllSubjects();

  }
  getAllSubjects() {
    this.masterService.getAll('Subject', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.subject = this.dataMappingService.mapToModel<Subject>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              //courseId:item.courseId,
              // courseName:item.courseName
            })
          );
        } else {
          alert(data.message);
        }
      });
  }

  // Edit
  editSubject(sId: any) {
    debugger
    this.getAllCourses();
    this.subjectId = sId;
    this.masterService
      .getById(sId, 'Subject', 'Get')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          debugger
          if (data.result != null && data.result.name != null) {
            this.subjectName = data.result.name;
            this.selectedValue = data.result.courseId;
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
  }

  // create
  createSubject() {
    debugger
    let num: number = parseInt(this.selectedValue);
    var objCourse = {
      name: this.subjectName,
      thumbnail: "Subject ThumbNail",
      courseId:parseInt(this.selectedValue)
    }
    this.masterService.post(objCourse, 'Subject', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllSubjects();
        } else {
          alert(data.message);
        }
      });
      this.isAddPopupVisible = false;
    window.location.reload();
  }

  // update
  updateSubject() {
    debugger
    var objCourse = {
      id: this.subjectId,
      name: this.subjectName,
      thumbnail: "Subject Thumbnail",
      courseId:parseInt(this.selectedValue)
    }
    this.masterService.put(objCourse, 'Subject', 'Update')
      .subscribe((data: any) => {
        debugger
        if (data.isSuccess) {
          this.getAllSubjects();
        } else {
          alert(data.message);
        }
      });
      this.isAddPopupVisible = false;
    window.location.reload();
  }

  // Delete
  deleteSubject(sId: any) {

    this.masterService
      .delete(sId, 'Subject', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllSubjects();
        } else {
          alert(data.message);
        }
      });
  }

  
  // Delete-Conformation
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
        this.deleteSubject(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }


  //File-Upload
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
      this.masterService.post(formData, 'Subject', 'Upload')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            alert(data.result);
            this.getAllSubjects();
          } else {
            alert(data.message);
          }
        });
    }
    else {
      alert("Please select a File!")
    }
  }

  getAllCourses() {
   debugger
    this.masterService.getAll('Course', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          debugger
          this.courseData = this.dataMappingService.mapToModel<Course>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
            }))
          console.log(this.courseData);
        } else {
          alert(data.message);
        }
      });
  }

}
