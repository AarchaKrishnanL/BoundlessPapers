
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   UserName: string = "";
//   Email: string = "";
//   Password: string = "";
//   MobileNumber: string = "";

//   constructor(private router: Router, private http: HttpClient) {}

//   onLogin() {
    
//     if (
//       this.UserName.trim() === "" ||
//       this.Email.trim() === "" ||
//       this.Password.trim() === "" ||
//       this.MobileNumber.trim() === ""
//     ) {
//       alert("Please fill in all the required fields.");
//       return;
//     }

//     let bodyData = {
//       "userName": this.UserName,
//       "password": this.Password,
//       "mobileNumber": this.MobileNumber,
//       "email": this.Email
//     };

//     this.http.post("https://localhost:7060/api/User", bodyData, { responseType: 'text' }).subscribe(
//       (resultData: any) => {
//         alert('Registration successful! You can now login.');
//         this.router.navigateByUrl('/userlogin');
//       },
//       (error) => {
//         alert('Error during registration. Please try again.');
//       }
//     );
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  UserName: string = "";
  Email: string = "";
  Password: string = "";
  MobileNumber: string = "";

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    // Validate input fields
    if (this.UserName.trim() === "") {
      alert("Please enter a username.");
      return;
    }

    if (this.Email.trim() === "" || !this.isValidEmail(this.Email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (this.Password.trim() === "" || this.Password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (this.MobileNumber.trim() === "" || !this.isValidMobileNumber(this.MobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    let bodyData = {
      "userName": this.UserName,
      "password": this.Password,
      "mobileNumber": this.MobileNumber,
      "email": this.Email
    };

    this.http.post("https://localhost:7060/api/User/Create", bodyData, { responseType: 'text' }).subscribe(
      (resultData: any) => {
        alert('Registration successful! You can now login.');
        this.router.navigateByUrl('/userlogin');
      },
      (error) => {
        alert('Error during registration. Please try again.');
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidMobileNumber(mobileNumber: string): boolean {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
  }
}
