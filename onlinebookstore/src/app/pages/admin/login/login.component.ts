// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//   email:string="";
// password:string="";


// constructor(private router:Router, private http:HttpClient) {}
// onLogin()
// {
// let bodyData={
// "email":this.email,
// "password":this.password,
// };
// this.http.post("https://localhost:7060/api/User/Login",bodyData,{responseType:'text'}).subscribe((resultData:any)=>
// {
// console.log(resultData);
// if(resultData == "Couldn't find the user, create new" ){
// alert("Incorrect Credentails for admin");

// }

// else{
//  alert('Successfully Loged in');
//  this.router.navigateByUrl('/adminaccess');
// }
// });
// }
// }


import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";

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
      localStorage.setItem('admin-token',token);

      if (resultData === "Incorrect Credentails for admin") {
        alert("Incorrect Credentials for admin");
      } else {
        alert('Successfully Logged in');
        this.router.navigateByUrl('/adminaccess');
      }
    });
  }
}
