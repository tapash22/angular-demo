import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginResponse {
  result: boolean;
  data: any; // Replace 'any' with a proper type if known
}

@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent {

  http = inject(HttpClient)
  router = inject(Router)

  loginObj: any = {
    'userName': '',
    'password': '',
  };


  onLogin(){
    this.http.post<LoginResponse>("/api/FreelancerJobs/login", this.loginObj)
    .subscribe((res) => {
      if (res.result) {
        localStorage.setItem('employeeApp', JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      }
    });
  
  }

}
