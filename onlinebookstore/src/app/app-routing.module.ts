import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guard/admin.guard';
import { userGuard } from './guard/user.guard';
import { AboutComponent } from './pages/admin/about/about.component';
import { AdminAccessComponent } from './pages/admin/admin-access/admin-access.component';
import { ContactComponent } from './pages/admin/contact/contact.component';
import { FooterComponent } from './pages/admin/footer/footer.component';

import { LoginComponent } from './pages/admin/login/login.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './pages/navbar/navbar.component';


import { LandingComponent } from './pages/website/landing/landing.component';

import { RegisterComponent } from './pages/website/register/register.component';
import { BooklistuserComponent } from './pages/website/Useraccess/booklistuser/booklistuser.component';
import { OrderComponent } from './pages/website/Useraccess/order/order.component';

import { UserComponent } from './pages/website/userlogin/useraccess/user/user.component';
import { OrderpageComponent } from './pages/website/userlogin/useraccess/userpage/orderpage/orderpage.component';
import { UserorderpageComponent } from './pages/website/userlogin/useraccess/userpage/userorderpage/userorderpage.component';
import { UserpageComponent } from './pages/website/userlogin/useraccess/userpage/userpage.component';
import { UserbookdetailsComponent } from './pages/website/userlogin/userbookdetails/userbookdetails.component';
import { UserloginComponent } from './pages/website/userlogin/userlogin.component';



const routes: Routes = [
{

path:'userlogin',
component:UserloginComponent
},

   
{
  path:'Adminlogin',
  component:LoginComponent
  },

{
  path:'register',
  component:RegisterComponent
},


{
  path:'',
  component:HomepageComponent
},

{
  path:'contact',
  component:ContactComponent
},
{
  path:'about',
  component:AboutComponent
},
{
  path:'navbar',
  component:NavbarComponent
},

{
  path:'userpage',
  component:UserpageComponent,
  canActivate:[userGuard]
},

{
  path:'adminaccess',
component:AdminAccessComponent,
canActivate:[adminGuard]
},
{
  path:'landing',
component:LandingComponent,
canActivate:[userGuard]
},


{
  path:'userbooklist',
component:BooklistuserComponent
},
{
  path:'user',
component:UserComponent,
canActivate:[userGuard]

},
{
  path:'order',
  component:OrderComponent
},
{
  path:'footer',
  component:FooterComponent
},
{
  path:'orderpage',
  component:OrderpageComponent,
  canActivate:[adminGuard]
},
{
  path:'user-orderpage',
  component: UserorderpageComponent,
  canActivate:[userGuard]
},
{
  path:'userbook',
  component: UserbookdetailsComponent
}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
