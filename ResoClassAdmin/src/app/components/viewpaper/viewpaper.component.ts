import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewpaper',
  templateUrl: './viewpaper.component.html',
  styleUrl: './viewpaper.component.css'
})
export class ViewpaperComponent {
  questionList: any[] = [];
  examId:number = 0;
  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id: string = params['id'];
      this.examId = parseInt(id)
      this.getAllQuestions();
    });
  }

  getAllQuestions() {
    this.masterService
      .getById(this.examId, 'ScheduledExam', 'GetScheduledExamQuestions')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.questionList = data.result;
        } else {
          alert(data.message);
        }
      });
  }

  deleteQuestion(id: number) {
    if (id > 0) {
      var data = [];
      data.push(id);
      this.masterService
        .post(data, 'Assessment', 'DeleteQuestions')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.getAllQuestions();
          } else {
            alert(data.message);
          }
        });
    }
  }

  deleteAllQuestions() {
    var data = this.questionList.map(({ id }) => id);
    this.masterService
      .post(data, 'Assessment', 'DeleteQuestions')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllQuestions();
        } else {
          alert(data.message);
        }
      });
  }
}
