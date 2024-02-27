import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; 
import { ColDef } from 'ag-grid-community'; 
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-callvolume',
  templateUrl: './callvolume.component.html',
  styleUrl: './callvolume.component.css'
})
export class CallvolumeComponent implements OnInit{
  
  callVolumeList:any [] = [];
  colDefs: ColDef[] = [
    {field: "callVolumeId",filter:'agTextColumnFilter',checkboxSelection:true},
    {field: "customerName",filter:'agTextColumnFilter'},
    {field: "phoneNumber",filter:'agTextColumnFilter'},
    {field: "email",filter:'agTextColumnFilter'},
    {field: "pan",filter:'agTextColumnFilter'},
    {field: "cardNumber",filter:'agTextColumnFilter'},
    {field: "accountNumber",filter:'agTextColumnFilter'},
    {field: "outStanding",filter:'agTextColumnFilter'},
    {field: "lastPaidDate",filter:'agTextColumnFilter'},
    {field: "lastPaidAmount",filter:'agTextColumnFilter'},
    {field: "allocatedTo",filter:'agTextColumnFilter'},
    {field: "isActive"}
   

  ]; 
  constructor(private http:HttpClient, private auth:AuthService) {
    this.getCallVolume();
  }
  ngOnInit(): void {
  }
  defaultColDef={
    flex:1,
    minWidth:100,
    sortable:true,filter:true
  }
  getCallVolume(){
    debugger
    var token: any = this.auth.getToken();
    const header = new HttpHeaders().set('Authorization', 'Bearer '+ token);
    this.http.get('https://localhost:7262/api/CallVolume', {headers :header}).subscribe((res:any)=>{
      console.log(res);
      if(res !== undefined && res.isSuccess){
        this.callVolumeList = res.result;
      }
      else{
        alert(res.message)
      }
    })
  }
  }
