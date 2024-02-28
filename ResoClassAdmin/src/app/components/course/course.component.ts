import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Course } from '../../models/course';
import { DataMappingService } from '../../services/data-mapping.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  courses: Course[] | undefined;
  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService
  ) {}

  ngOnInit(): void {
    this.masterService
      .fetchDataWithToken('Course/GetAll')
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
}
