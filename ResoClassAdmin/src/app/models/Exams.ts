export interface Exams {
    Id: number;
    Name: string;
    Description:string;
    NumberOfQuestions:number;
    TotalMarks:number;
    PassMarks:number;
    ScheduledOn:Date;
    IsActive:boolean;
    CreatedBy:string;
    CreatedOn:Date;
    ModifiedBy:string;
    ModifiedOn:Date;
    
  }