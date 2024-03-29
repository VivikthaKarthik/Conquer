import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Chapters } from '../../models/chapters';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';


@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css'
})
export class ChaptersComponent {
  chapters: Chapters[] | undefined;
  subjects: Subject[] | undefined;
  chapterName: string = '';
  chapterId: any;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: any;
  selectedFile: File | undefined;
  imageUrl: string | undefined;
  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllChapters();

  }

  getAllChapters() {
    this.masterService.getAll('Chapter', 'GetAll')
      .subscribe((data: any) => {
        
        if (data.isSuccess) {
          this.chapters = this.dataMappingService.mapToModel<Chapters>(
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

  editChapter(cId: any) {
    this.chapterId = cId;
    this.masterService
      .getById(cId, 'Chapter', 'Get')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.chapterName = data.result.name;
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
    var objCourse = {
      name: this.chapterName,
      thumbnail: "Chapter ThumbNail",
    }
    this.masterService.post(objCourse, 'Chapter', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllChapters();
        } else {
          alert(data.message);
        }
      });
  }

  updateChapter() {
    var objCourse = {
      id: this.chapterId,
      name: this.chapterName,
      thumbnail: "Chapter Thumbnail"
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

      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33'
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

  // Event handler for file input change event
  onFileSelected(event: any): void {
    
    const file: File = event.target.files[0];
    if (file) {
      // Call the service method to read Excel file
      // this.excelService.readExcelFile(file);
      // // If you need to upload the file to a backend
      // this.excelService.uploadExcelFile(file,'Course', 'Upload');
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

  getSubByCourseID(cId:any) {
    this.masterService.getById(cId,'Subject', 'GetSubjectByCourseId')
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

  onImageFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
  }
  uploadImage(): void {
    if (this.selectedFile) {
      this.masterService.uploadImage(this.selectedFile,'Subject', 'Upload')
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

}
