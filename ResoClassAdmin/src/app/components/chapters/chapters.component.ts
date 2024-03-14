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
import {
  Form,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css',
})
export class ChaptersComponent {
  chaptersList: Chapters[] = [];
  subjects: Subject[] = [];
  chapterName: string = '';
  chapterId: any;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: any;
  selSubjectId: number = 0;
  selectedFile: File | undefined;
  showBulkUploadButton: boolean = false;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;
  desc: string = '';
  colDefs: ColDef[] = [];
  chapterForm!: FormGroup;
  chapterEditForm!: FormGroup;
  submitted: boolean = false;
  selectedId: number = 0;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    {
      this.colDefs.push({
        headerName: 'ID',
        field: 'id',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Chapter',
        field: 'name',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Thumbnail',
        field: 'thumbnail',
        filter: 'agTextColumnFilter',
        cellRenderer: function (params: any) {
          if (params && params.value) {
            return `<img src="${params.value}" style="max-height: 100px; max-width: 100px;" />`;
          } else {
            return null;
          }
        },
      });
    }
    // Reactive-Form validations
    {
      this.chapterForm = this.fb.group({
        name: ['', Validators.required],
        selCourseId: ['', Validators.required],
        selSubId: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

    this.chapterEditForm = this.fb.group({
      name: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selSubId: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
    });
  }

  showMessage() {
    this.notificationService.addNotification('Chapter Saved Successfully!.');
  }

  ngOnInit(): void {
    this.getAllChapters();
    this.getAllSubjects();
  }

  getAllChapters() {
    this.masterService.getAll('Chapter', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.chaptersList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  getChaptersById(cId: number) {
    debugger;
    this.chapterId = cId;
    this.masterService
      .getById(cId, 'Chapter', 'Get', 'chapterId')
      .subscribe((data: any) => {
        debugger;
        if (data.isSuccess) {
          debugger;
          if (data.result != null && data.result.name != null) {
            this.chapterName = data.result.name;
            this.selectedOption = data.result.courseId;
            this.selSubjectId = data.result.subjectId;
            this.isChecked = data.result.isRecommended;
            this.desc = data.result.description;
            this.getAllCoursesForEdit();
          } else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.chapterForm.invalid) {
      return;
    } else {
      this.createChapter();
    }
  }

  onEditSubmit() {
    this.submitted = true;
    if (this.chapterEditForm.invalid) {
      return;
    } else {
      this.updateChapter();
    }
  }

  createChapter() {
    debugger;
    let subjID: number = Number(this.chapterForm.value.selSubId);
    var objChapter = {
      name: this.chapterForm.value.name,
      subjectId: subjID,
      isRecommended: this.isChecked,
      description: this.chapterForm.value.description,
    };
    this.masterService
      .postWithFile(objChapter, this.selectedFile, 'Chapter', 'Create')
      .subscribe((data: any) => {
        debugger;
        if (data.isSuccess) {
          this.getAllChapters();
          // ($('#add_chapter') as any).modal('hide');
          this.showMessage();
        } else {
          alert(data.message);
        }
      });
    this.isAddPopupVisible = false;
    window.location.reload();
  }

  updateChapter() {
    debugger;
    let subjID: number = Number(this.chapterEditForm.value.selSubId);
    var objCourse = {
      id: this.chapterId,
      name: this.chapterEditForm.value.name,
      subjectId: subjID,
      thumbnail: 'https://www.neetprep.com/exam-info',
      isRecommended: this.isChecked,
    };
    this.masterService
      .put(objCourse, 'Chapter', 'Update')
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.showBulkUploadButton = true;
    } else {
      this.selectedFile = undefined;
      this.showBulkUploadButton = false;
    }
  }

  getAllCourses() {
    this.masterService.getAll('Course', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseData = this.dataMappingService.mapToModel<Course>(
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
  getAllSubjects() {
    this.masterService.getAll('Subject', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.subjectData = this.dataMappingService.mapToModel<Subject>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
          })
        );
        console.log(this.courseData);
      } else {
        alert(data.message);
      }
    });
  }

  getAllCoursesForEdit() {
    this.masterService.getAll('Course', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseData = this.dataMappingService.mapToModel<Course>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
          })
        );
        ($('#edit_chapter') as any).modal('show');
      } else {
        alert(data.message);
      }
    });
  }

  getSubByCourseID(cId: number) {
    if (cId != undefined) {
      this.masterService
        .getById(cId, 'Subject', 'GetSubjectsByCourseId', 'courseId')

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
  }

  onImageFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  uploadImage(): void {
    alert();
    if (this.selectedFile) {
      this.masterService
        .uploadImage(this.selectedFile, 'Subject', 'Upload')
        .subscribe(
          (response) => {
            console.log('Image uploaded successfully', response);
            // if (response && response) {
            //   this.imageUrl = response; // Assuming the response has a property named 'imageUrl'
            // } else {
            //   console.error('Image URL not found in the response');
            // }
          },
          (error) => {
            console.error('Error uploading image', error);
            // Handle error
          }
        );
    }
  }

  editGridRecord(id: any) {
    this.getChaptersById(id);
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }
  closeModal() {
    ($('#edit_chapter') as any).modal('hide');
  }
}
