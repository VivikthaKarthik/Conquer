import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Chapters } from '../../models/chapters';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';
import { NotificationService } from '../../services/notification.service';
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css'
})
export class ChaptersComponent {
  chaptersList: Chapters[] = [];
  subjects: Subject[] = [];
  chapterName: string = '';
  chapterId: any;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: any;
  selSubjectId: number | undefined;
  selectedFile: File | undefined;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;
  desc:string = "";
  colDefs: ColDef[] = [];


  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private dialog: MatDialog, public notificationService: NotificationService
  ) {
    this.colDefs.push({
      headerName: 'ID', field: 'id', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Chapter', field: 'name', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Thumbnail', field: 'thumbnail', filter: 'agTextColumnFilter',
    });
   }

  showMessage() {
    this.notificationService.addNotification('Chapter Saved Successfully!.');
  }

  ngOnInit(): void {
    this.getAllChapters();

  }

  getAllChapters() {
    this.masterService.getAll('Chapter', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.chaptersList = data.result;
        } else {
          alert(data.message);
        }
      });
  }

  getChaptersById(cId: number) {
    debugger
    this.chapterId = cId;
    this.masterService
      .getById(cId, 'Chapter', 'Get')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.chapterName = data.result.name;
            this.selectedOption = data.courseId;
            this.selSubjectId = data.subjectId;
            this.isChecked = data.isRecommended;
            this.desc = "";
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
  }

  createChapter() {
    debugger
    var objChapter = {
      name: this.chapterName,
      subjectId: this.selSubjectId,
      thumbnail: "https://www.neetprep.com/exam-info",
      isRecommended: this.isChecked
    }
    this.masterService.post(objChapter, 'Chapter', 'Create')
      .subscribe((data: any) => {
        debugger
        if (data.isSuccess) {
          this.getAllChapters();
          this.showMessage();
        } else {
          alert(data.message);
        }
      });
    this.isAddPopupVisible = false;
    window.location.reload();
  }
  

  updateChapter() {
    var objCourse = {
      id: this.chapterId,
      name: this.chapterName,
      subjectId: this.selSubjectId,
      thumbnail: "https://www.neetprep.com/exam-info",
      isRecommended: this.isChecked
    }
    this.masterService.put(objCourse, 'Chapter', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllChapters();
        } else {
          alert(data.message);
        }
      });
  }

  deleteChapters(cId: any) {

    this.masterService
      .delete(cId, 'Chapter', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllChapters();
        } else {
          alert(data.message);
        }
      });
  }



  showConfirmation(id: any): void {
    Swal.fire({

      text: 'Do you really want to remove this chapter/class?',
      icon: 'warning',
      showCancelButton: true,

    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteChapters(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  
  onFileSelected(event: any): void {

    const file: File = event.target.files[0];
    if (file) {
      
      const formData = new FormData();
      formData.append('file', file);
      this.masterService.post(formData, 'Chapter', 'Upload')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            alert(data.result);
            this.getAllChapters();
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
    
    this.masterService.getAll('Course', 'GetAll')
      .subscribe((data: any) => {

        if (data.isSuccess) {
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

  getSubByCourseID(cId: number) {
    
    this.masterService.getById(cId, 'Subject', 'GetSubjectsByCourseId')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.subjectData = this.dataMappingService.mapToModel<Subject>(
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

  onImageFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  uploadImage(): void {
    if (this.selectedFile) {
      this.masterService.uploadImage(this.selectedFile, 'Subject', 'Upload')
        .subscribe(
          response => {
            console.log('Image uploaded successfully', response);
            // if (response && response) {
            //   this.imageUrl = response; // Assuming the response has a property named 'imageUrl'
            // } else {
            //   console.error('Image URL not found in the response');
            // }
          },
          error => {
            console.error('Error uploading image', error);
            // Handle error
          }
        );
    }
  }
  
  editGridRecord(id: any) {
    this.getChaptersById(id);
    alert("Subject ID" + id);

  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

}
