import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';


@Component({
  selector: 'app-viewanalysis',
  templateUrl: './viewanalysis.component.html',
  styleUrl: './viewanalysis.component.css'
})
export class ViewanalysisComponent {
   assessment:any = {};
  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      debugger
      const id:string = params['id'];
      this.getPractiseAnalysis(id);
    });
  }
  
  getPractiseAnalysis(id:any){
    
    this.masterService
      .getById(id, 'Report', 'GetAssessmentReport')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null) {
            this.assessment = data.result;
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });

  }
}
