// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrl: './order.component.css'
// })
// export class OrderComponent {

// }


// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';

// interface Order {
//   orderId: number;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
// }

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   orders: Order[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchOrders();
//   }

//   fetchOrders() {
//     this.http.get<Order[]>('https://localhost:7060/api/Order').subscribe(
//       (response) => {
//         this.orders = response;
//       },
//       (error) => {
//         console.error('Error fetching orders:', error);
//       }
//     );
//   }

//   cancelOrder(orderId: number) {
//     this.http.delete(`https://localhost:7060/api/Order/${orderId}`, { responseType: 'text' }).subscribe(
//       (resultData) => {
//         console.log(resultData);
//         this.fetchOrders();
//       },
//       (error) => {
//         console.error('Error canceling order:', error);
//       }
//     );
//   }
// }



// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// interface Order {
//   orderId: number;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
// }

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   orders: Order[] = [];

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit() {
//     this.fetchOrders();
//   }

//   fetchOrders() {
//     this.http.get<Order[]>(`https://localhost:7060/api/Order`).subscribe(
//       (response) => {
//         this.orders = response;
//         console.log(response);
//       },
//       (error) => {
//         console.error('Error fetching orders:', error);
//       }
//     );
//   }

//   cancelOrder(orderId: number) {
//     this.http.delete(`https://localhost:7060/api/Order/${orderId}`, { responseType: 'text' }).subscribe(
//       (resultData) => {
//         console.log(resultData);
//         this.fetchOrders();
//       },
//       (error) => {
//         console.error('Error canceling order:', error);
//       }
//     );
//   }

//   navigateToUserComponent() {
//     this.router.navigate(['user']);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// interface Order {
//   orderId: number;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
// }

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[]=[]; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get(`https://localhost:7060/api/Order`).subscribe(
      (response:any) => {
        this.orders = response;
        console.log(this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  cancelOrder(orderId: number) {
    this.http.delete(`https://localhost:7060/api/Order/${orderId}`, { responseType: 'text' }).subscribe(
      (resultData) => {
        console.log(resultData);
        this.fetchOrders();
      },
      (error) => {
        console.error('Error canceling order:', error);
      }
    );
  }

  navigateToUserComponent() {
    this.router.navigate(['user']);
  }
}

