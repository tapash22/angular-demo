import { Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  IChildDepartment,
  IParentDepartment,
} from '../model/Employee';
import { MasterService } from '../service/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [CommonModule,FormsModule],

  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  parentDepList: IParentDepartment[] = [];
  childDepList: IChildDepartment[] = [];

  depId: number = 0;

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getParentDepartmentList();
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
    console.log(this.depId)
    this.masterService.getChildDepertment(this.depId).subscribe((res:ApiResponse)=>{
      this.childDepList = res.data
    console.log(this.childDepList)

    })
  }
}
