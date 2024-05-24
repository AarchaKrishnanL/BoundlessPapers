import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  email: string = "";
  password: string = "";
  url: any = "https://localhost:7060/api/User/GetUserIdByEmail";

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    // Validate email and password
    if (this.email.trim() === "" || this.password.trim() === "") {
      alert("Please enter your email and password.");
      return;
    }

    let bodyData = {
      "email": this.email,
      "password": this.password
    };

    this.http.post("https://localhost:7060/api/User/Login", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
  
      const token = resultData;
      localStorage.setItem('token',token);
      localStorage.setItem('email',this.email);




      const headers = {'Authorization': `Bearer ${token}`};

      this.http.get<any>(`${this.url}?email=${this.email}`, {headers}).subscribe({
        next: userId => {
         
          localStorage.setItem('userId', userId.toString());
          console.log('User ID retrieved from API:', userId);
        },
            error: err => {
              console.error('Error fetching habits:', err);
            }
          });




      if (resultData === "Couldn't find the user, create new") {
        alert("Incorrect Credentials for user");
      } else {
        alert('Successfully Logged in');
        this.router.navigateByUrl('/landing');
      }
    });
  }
}


