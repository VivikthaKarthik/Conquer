import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-addchapter',
  templateUrl: './addchapter.component.html',
  styleUrl: './addchapter.component.css'
})
export class AddchapterComponent {
  addChapterForm!: FormGroup;
  submitted = false;
  courseData: ListItem[] = [];
  subjectData: ListItem[] = [];
  classData: ListItem[] = [];
  selectedFile: File | undefined;
  isChecked:boolean=true;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private fb: FormBuilder, private router: Router
  ) { }



  ngOnInit(): void {
    this.getCourses();

    this.addChapterForm = this.fb.group({
      name: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selClassId: ['', Validators.required],
      selSubId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

 
  getCourses() {
    this.masterService.getListItems('Course', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseData = this.dataMappingService.mapToModel<ListItem>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
          })
        );
      } else {
        alert(data.message);
      }
    });
  }
  getClsByCourseId(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Class', 'Course', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.classData = this.dataMappingService.mapToModel<ListItem>(
              data.result,
              (item) => ({
                id: item.id,
                name: item.name,
              })
            );
          } else {
            alert(data.message);
          }
        });
    }
  }
  getSubByClsID(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Subject', 'Class', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.subjectData = this.dataMappingService.mapToModel<ListItem>(
              data.result,
              (item) => ({
                id: item.id,
                name: item.name,
              })
            );
          } else {
            alert(data.message);
          }
        });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addChapterForm.invalid) {
      return;
    } else {
      this.createChapter();
    }
  }
  createChapter() {
    let subjID: number = Number(this.addChapterForm.value.selSubId);
    var objChapter = {
      name: this.addChapterForm.value.name,
      subjectId: subjID,
      isRecommended: this.isChecked,
      description: this.addChapterForm.value.description,
    };

    this.masterService
      .postWithFile(objChapter, this.selectedFile, 'Chapter', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/chapter']);
        } else {
          alert(data.message);
        }
      });
    
  }

}
