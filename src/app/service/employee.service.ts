import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Employee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  createEmployee(employee: Employee): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/api/EmployeeManagement/CreateEmployee', employee);
  }

  getEmployees() {
    return this.http.get<Employee>("/api/EmployeeManagement/GetAllEmployees")
  }
  
}
