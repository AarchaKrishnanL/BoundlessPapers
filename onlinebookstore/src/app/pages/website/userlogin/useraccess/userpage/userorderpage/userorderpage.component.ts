import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../../../BookService.service';
@Component({
  selector: 'app-userorderpage',
  templateUrl: './userorderpage.component.html',
  styleUrl: './userorderpage.component.css'
})
export class UserorderpageComponent implements OnInit {


  orders: any[] = [];

  constructor(private http: HttpClient, private bookservice:BookService){}


  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){

    const userId = localStorage.getItem("userId");
    const jwtToken = localStorage.getItem("jwtToken");

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${jwtToken}`
    })

    this.http.get<any>("https://localhost:7060/api/Order", {headers}).subscribe({

    next: data => {

      this.orders = data.filter((order: {userId: any}) => order.userId === parseInt(userId));
      console.log(this.orders);
    },
    error: err => {
      console.error("Error fetching habits");
    }
    });

  }


  //getAllOrders


  cancelOrder(orderId: number) {

    const storedToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);
    this.http.delete(`https://localhost:7060/api/Order/${orderId}`, { headers }).subscribe(
      
      (resultData) => {
        console.log(resultData);
        this.getAllOrders();
        alert (" Your order has Canceled successfully");
      },
      (error) => {
        console.error('Error canceling order:', error);
       
      }
    );
  }
}

//   getAllOrders(){
//     const jwtToken = localStorage.getItem("jwtToken");
//     this.bookservice.getAllOrders(jwtToken).subscribe({
//       next: data => {
//         const userId = localStorage.getItem("userId");
//         this.orders = data.filter((order: {userId: any}) => order.userId === parseInt(userId));
//         console.log(this.orders);
//       },
//       error: err => {
//         console.error("Error fetching habits");
//       }
//     });
//   }

//   cancelOrder(orderId: number) {
//     const jwtToken = localStorage.getItem('jwtToken');
//     this.bookservice.cancelOrder(orderId, jwtToken).subscribe(
//       (resultData) => {
//         console.log(resultData);
//         this.getAllOrders();
//         alert (" Your order has Canceled successfully");
//       },
//       (error) => {
//         console.error('Error canceling order:', error);
//       }
//     );
//   }
// }

