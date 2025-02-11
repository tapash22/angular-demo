import { Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  Employee,
  IChildDepartment,
  IParentDepartment,
} from '../model/Employee';
import { MasterService } from '../service/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  imports: [CommonModule,FormsModule],

  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  parentDepList: IParentDepartment[] = [];
  childDepList: IChildDepartment[] = [];

  employeeList: Employee[] = []

  depId: number = 0;

  employeeObj:Employee = new Employee()

  constructor(private masterService: MasterService,private empService: EmployeeService) {}

  ngOnInit(): void {
    this.getParentDepartmentList();
    this.getEmployes();
  }

  getParentDepartmentList() {
    this.masterService.getParentDepertment().subscribe(
      (res: ApiResponse) => {
        if (Array.isArray(res.data)) {
          this.parentDepList = res.data;
        } else {
          this.parentDepList = [res.data];
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  onDepartmentChange() {
    this.masterService.getChildDepertment(this.depId).subscribe((res:ApiResponse)=>{
      this.childDepList = res.data
    })
  }

  onSaveEmp() {
    this.empService.createEmployee(this.employeeObj).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert('Created');
      } else {
        alert(res.message);
      }
    });
  }


  getEmployes(){
    this.empService.getEmployees().subscribe((res:any)=>{
      this.employeeList = res
    })
  }

  
}
