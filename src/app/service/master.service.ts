import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getParentDepertment(){
    return this.http.get<ApiResponse>("/api/EmployeeManagement/GetParentDepartment")
  }
}
