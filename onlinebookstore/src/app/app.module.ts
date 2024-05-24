import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { LandingComponent } from './pages/website/landing/landing.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserloginComponent } from './pages/website/userlogin/userlogin.component';
import { RegisterComponent } from './pages/website/register/register.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactComponent } from './pages/admin/contact/contact.component';
import { AboutComponent } from './pages/admin/about/about.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserpageComponent } from './pages/website/userlogin/useraccess/userpage/userpage.component';
import { UserbookdetailsComponent } from './pages/website/userlogin/userbookdetails/userbookdetails.component';

import { AdminAccessComponent } from './pages/admin/admin-access/admin-access.component';

import { BooklistuserComponent } from './pages/website/Useraccess/booklistuser/booklistuser.component';
import { UserComponent } from './pages/website/userlogin/useraccess/user/user.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/admin/footer/footer.component';
import { OrderpageComponent } from './pages/website/userlogin/useraccess/userpage/orderpage/orderpage.component';
import { UserorderpageComponent } from './pages/website/userlogin/useraccess/userpage/userorderpage/userorderpage.component';
import { BookService } from './BookService.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
  
    // OrdersComponent,
    UserloginComponent,
    RegisterComponent,
    HomepageComponent,
    ContactComponent,
    AboutComponent,
    NavbarComponent,
    UserpageComponent,
    UserbookdetailsComponent,
    AdminAccessComponent,
    BooklistuserComponent,
    UserComponent,
    FooterComponent,
    OrderpageComponent,
    UserorderpageComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
