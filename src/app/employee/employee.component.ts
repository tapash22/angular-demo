import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../model/Employee';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  parentDepList:any = [];

  constructor(private masterService: MasterService) {} // Ensure this is properly injected

  ngOnInit(): void {
    this.getParentDepartmentList();
  }

  getParentDepartmentList() {
    this.masterService.getParentDepertment().subscribe((res: ApiResponse) => {
      if (Array.isArray(res.data)) {
        this.parentDepList = res.data;
      } else {
        this.parentDepList = [res.data]; 
      }
      
      console.log(this.parentDepList)
    }, (error) => {
      console.error("API Error:", error);
    });
  }
}
