import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Book } from '../../../model/Book';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  [x: string]: any;

  
 //getvalue =[];
 blist:any;
 

  constructor(private http:HttpClient, router : Router )
  {

  }
  ngOnInit() {
    this.http.get('https://localhost:7060/api/Books').subscribe((response)=>{
      this.blist=response;
    },(error)=>console.log(error));
  }
  // public getmethod(){
  //   // this.http.get('https://localhost:7060/api/Books').subscribe((data) => {
  //   //   //console.log(data);
  //   //   this.blist = data;
      
  //   }
// );

logout() {
  // Clear the token from local storage
  localStorage.removeItem('token');

  // Navigate to the login page or any other desired page
  this.router.navigate(['userlogin']);
}

  }

