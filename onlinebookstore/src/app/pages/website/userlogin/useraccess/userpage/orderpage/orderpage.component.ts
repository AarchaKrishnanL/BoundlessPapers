
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../../../../BookService.service';

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrl: './orderpage.component.css'
})
export class OrderpageComponent  {
  ngOnInit(): void {
    this.fetchOrders();
  }

  orders: any[] = [];

  constructor(private router: Router, private http: HttpClient, private bookservice: BookService) {}

  fetchOrders() {
    //this.http.get<any[]>("https://localhost:7060/api/Order").subscribe(
this.bookservice.getOrders().subscribe(
      (response) => {
        this.orders = response;
       console.log(this.fetchOrders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  
  
  // cancelOrder(orderId: number) {
  //   this.http.delete('https://localhost:7060/api/Order', { responseType: 'text' }).subscribe(
      
  //     (resultData) => {
  //       console.log(resultData);
  //       this.fetchOrders();
  //       alert (" Your order has Canceled successfully");
  //     },
  //     (error) => {
  //       console.error('Error canceling order:', error);
       
  //     }
  //   );
  // }



  
  }



