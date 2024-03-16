import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Chapters } from '../../models/chapters';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  usersList: Chapters[] = [];
  chapters: Chapters[] | undefined;
  subjects: Subject[] | undefined;
  students: Student[] | undefined;
  chapterName: string = '';
  studentId: any;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: any;
  selSubjectId: number | undefined;
  selectedFile: File | undefined;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;

  admissionId: string = '';
  studenrName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dateOfBirth: Date = new Date();
  courseId: number = 0;
  admissionDate: Date = new Date();
  MobileNumber: string = '';
  EmailAddress: string = '';
  AlternateMobileNumber: string = '';
  AddressLine1: String = '';
  AddressLine2: String = '';
  Gender: string = '';
  landMark: string = '';
  stateId: number = 0;
  cityId: number = 0;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCourses();
  }

  editStudent(cId: any) {
    this.router.navigate(['/student'], { queryParams: { id: cId } });
  }
  getAllUsers() {
    this.masterService.getAll('Chapter', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.usersList = data.result;
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

      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  deleteStudent(cId: any) {
    this.masterService
      .delete(cId, 'Chapter', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllUsers();
        } else {
          alert(data.message);
        }
      });
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
        console.log(this.courseData);
      } else {
        alert(data.message);
      }
    });
  }
}
