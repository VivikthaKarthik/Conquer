import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-edittopic',
  templateUrl: './edittopic.component.html',
  styleUrl: './edittopic.component.css'
})
export class EdittopicComponent {
  editTopicForm!: FormGroup;
  submitted = false;
  courseData: ListItem[] = [];
  subjectData: ListItem[] = [];
  classData: ListItem[] = [];
  chapterData: ListItem[] = [];
  topicData: ListItem[] = [];
  selectedFile: File | undefined;
  isChecked: boolean = true;
  topicId: number = 0;
  selectedImageURL: any;
 

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editTopicForm = this.fb.group({
      name: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selClassId: ['', Validators.required],
      selSubjectId: ['', Validators.required],
      selChapterId: ['', Validators.required],
      description: ['', Validators.required],
    
    });
  }



  ngOnInit(): void {
    this.getCourses();
    this.getClsByCourseId(0);
    this.getSubByClsID(0);
    this.getChaptersBySubID(0);
    
  
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];
      this.topicId = parseInt(id);
      this.getTopicById(this.topicId);
    });

  }
  getTopicById(Id: any) {
    this.masterService.getById(Id, 'Topic', 'Get').subscribe((data: any) => {
      if (data.isSuccess) {
        if (data.result != null && data.result.name != null) {
          this.selectedImageURL = data.result.thumbnail;
          this.editTopicForm.controls.name.setValue(data.result.name);
          this.editTopicForm.controls.selCourseId.setValue(data.result.courseId);
          this.editTopicForm.controls.selClassId.setValue(data.result.classId);
          this.editTopicForm.controls.selSubjectId.setValue(data.result.subjectId);
          this.editTopicForm.controls.selChapterId.setValue(data.result.chapterId);
          this.editTopicForm.controls.description.setValue(data.result.description);

          
        } else {
          alert('Some error occured..! Plaese try again');
        }
      } else {
        alert(data.message);
      }
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
    if (Id !== undefined && Id !== 0) {
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
    else{
      this.masterService.getListItems('Class', '', 0).subscribe((data: any) => {
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
    if (Id !== undefined && Id !== 0) {
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
    else{
      this.masterService.getListItems('Subject', '', 0).subscribe((data: any) => {
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
  getChaptersBySubID(Id: number) {
    if (Id !== undefined && Id !== 0) {
      this.masterService
        .getListItems('Chapter', 'Subject', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.chapterData = this.dataMappingService.mapToModel<ListItem>(
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
    else{
      this.masterService.getListItems('Chapter', '', 0).subscribe((data: any) => {
        if (data.isSuccess) {
          this.chapterData = this.dataMappingService.mapToModel<ListItem>(
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
    debugger
    this.selectedFile = event;
  }


  onSubmit() {
    this.submitted = true;
    if (this.editTopicForm.invalid) {
      return;
    } else {
      this.updateTopic();
    }
  }
  updateTopic() {
    var topicData = {
      id: this.topicId,
      name: this.editTopicForm.value.name,
      chapterId: this.editTopicForm.value.selChapterId,
      description: this.editTopicForm.value.description,
      thumbnail:"na"
    };
    if (this.selectedFile != null) {
      this.masterService
        .putWithFile(topicData, this.selectedFile, 'Topic', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/topic']);
          } else {
            alert(data.message);
          }
        });
    } else {
      this.masterService
        .put(topicData, 'Topic', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/topic']);
          } else {
            alert(data.message);
          }
        });
    }

    
  }
}
