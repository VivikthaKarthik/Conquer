import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Subject } from '../../models/subject';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Form, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subjectList: Subject[] = [];
  subjectName: string = '';
  subjectId: any;
  courseData: Course[] = [];
  isPopupVisible: any;
  selectedValue: string = "";
  isAddPopupVisible: boolean = true;
  colDefs: ColDef[] = [];

  constructor(
    private masterService: MasterService, private fb: FormBuilder,
    private dataMappingService: DataMappingService, private dialog: MatDialog
  ) {
    this.colDefs.push({
      headerName: 'ID', field: 'id', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Subject', field: 'name', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Thumbnail', field: 'thumbnail', filter: 'agTextColumnFilter',
    });
  }



  subForm = this.fb.group({
    subjectName: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    this.getAllSubjects();

  }
  getAllSubjects() {
    this.masterService.getAll('Subject', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.subjectList = data.result;
        } else {
          alert(data.message);
        }
      });
  }


  getSubjectById(sId: any) {
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


  createSubject() {
    debugger
    let num: number = parseInt(this.selectedValue);
    var objCourse = {
      name: this.subjectName,
      thumbnail: "Subject ThumbNail",
      courseId: parseInt(this.selectedValue)
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


  updateSubject() {
    debugger
    var objCourse = {
      id: this.subjectId,
      name: this.subjectName,
      thumbnail: "Subject Thumbnail",
      courseId: parseInt(this.selectedValue)
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



  showConfirmation(id: any): void {
    Swal.fire({

      text: 'Do you really want to remove this course/class?',
      icon: 'warning',
      showCancelButton: true,
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



  onFileSelected(event: any): void {
    debugger
    const file: File = event.target.files[0];
    if (file) {
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

  editGridRecord(id: any) {
    this.getSubjectById(id);
    alert("Subject ID" + id);

  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

}
