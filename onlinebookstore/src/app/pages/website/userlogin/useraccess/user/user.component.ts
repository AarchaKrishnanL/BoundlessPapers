import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../../../BookService.service';

interface Book {
  bookId: number;
  bookName: string;
  bookAuthor: string;
  bookDescription: string;
  price: number;
  imageURl: string;
}
// 
interface User {
  userId: number;
  userName: string;
}
// 
interface Order {
  orderId: number;
  bookName: string;
  noOfBooks: number;
  total_Price: number;
  orderDate: Date;
}

interface OrderSidePanel {
  title: string;
  btnText: string;
  bookName: string;
  noOfBooks: number;
  total_Price: number;
  orderDate: Date;
  bookId?: number;
  userId: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  getUserIdUrl: any = "https://localhost:7060/api/User/GetUserIdByEmail";

  isOrderListVisible: boolean = true;
  isOrderSidePanelVisible: boolean = false;
  books: Book[] = [];
  orders: Order[] = [];
  id!:Number;
 
  orderSidePanel: OrderSidePanel = {
    title: '',
    btnText: '',
    bookName: '',
    noOfBooks: 1,
    total_Price: 0,
    orderDate: new Date(),
    userId: 0 // Replace with the actual user ID
  };
  orderData: { bookName: string; noOfBooks: number; total_Price: number; userId: number; orderDate: any; };

  constructor(private http: HttpClient, private router: Router, private bookservice:BookService) {}

  ngOnInit() {
    this.fetchBooks();

      
  }

  fetchBooks() {
    this.http.get<Book[]>('https://localhost:7060/api/Books').subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  fetchOrders() {
    this.http.get<Order[]>(`https://localhost:7060/api/Order`).subscribe(
      (response) => {
        this.orders = response;
        this.isOrderListVisible = true;
        this.isOrderSidePanelVisible = false;
        alert (" Your order was processed without any issues");
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  


  openOrderSidePanel(book: Book) {
    
    this.isOrderListVisible = false;
    this.isOrderSidePanelVisible = true;
        this.isOrderListVisible = false;

        this.orderSidePanel = {
          title: `Order - ${book.bookName}`,
          btnText: 'Place Order',
          bookName: book.bookName,
          noOfBooks: 1,
          total_Price: book.price,
          orderDate: new Date(),
          bookId: book.bookId,
          userId: this.orderSidePanel.userId
        };
  }

  closeOrderSidePanel() {
    this.isOrderListVisible = true;
    this.isOrderSidePanelVisible = false;
    this.orderSidePanel = {
      title: '',
      btnText: '',
      bookName: '',
      noOfBooks: 1,
      total_Price: 0,
      orderDate: new Date(),
      userId: this.orderSidePanel.userId,
    
    };
  }
  logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Navigate to the login page or any other desired page
    this.router.navigate(['userlogin']);
  }

  
  viewOrders() {

    const storedToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);

    this.http.get<Order[]>(`https://localhost:7060/api/Order`).subscribe(
      (response) => {
        this.orders = response;
        this.isOrderListVisible = true;
        this.isOrderSidePanelVisible = false;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  placeOrder() {

    const totalPrice = this.orderSidePanel.noOfBooks * this.orderSidePanel.total_Price;
    
    this.orderData = {
            bookName: this.orderSidePanel.bookName,
            noOfBooks: this.orderSidePanel.noOfBooks,
           // total_Price: this.orderSidePanel.total_Price,
            total_Price:totalPrice,
            userId: Number(localStorage.getItem('userId')),
            orderDate: this.orderSidePanel.orderDate
          };

          
    const storedToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);

    this.http.post('https://localhost:7060/api/Order', this.orderData, { headers:headers }).subscribe(
      (resultData) => {

        console.log(resultData);
        //this.fetchOrders();
        this.closeOrderSidePanel();
        //alert ('We’ve received your order!!');
       // this.closeOrderSidePanel();
      alert (`We’ve received your order!! The total price is ${this.orderData.total_Price}`);
        
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
  }
}




































































































// =======================================kk-------------------------
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// interface Book {
//   bookId: number;
//   bookName: string;
//   bookAuthor: string;
//   bookDescription: string;
//   price: number;
//   imageURL: string;
// }

// interface Order {
//   orderId: number;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
// }

// interface OrderSidePanel {
//   title: string;
//   btnText: string;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
//   bookId?: number;
//   userId: number;
// }

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   isOrderSidePanelVisible: boolean = false;
//   isOrderListVisible: boolean = false;
//   books: Book[] = [];
//   orders: Order[] = [];
//   orderSidePanel: OrderSidePanel = {
//     title: '',
//     btnText: '',
//     bookName: '',
//     noOfBooks: 0,
//     total_Price: 0,
//     orderDate: new Date(),
//     userId: 1 // Replace with the actual user ID
//   };

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit() {
//     this.fetchBooks();
//   }

//   fetchBooks() {
    

//     this.http.get<Book[]>('https://localhost:7060/api/Books').subscribe(
//       (response) => {
//         this.books = response;
//       },
//       (error) => {
//         console.error('Error fetching books:', error);
//       }
//     );
//   }

//   fetchOrders() {
//     this.http.get<Order[]>(`https://localhost:7060/api/Order`).subscribe(
//       (response) => {
//         this.orders = response;
//         this.isOrderListVisible = true;
//         this.isOrderSidePanelVisible = false;
//       },
//       (error) => {
//         console.error('Error fetching orders:', error);
//       }
//     );
//   }

//   openOrderSidePanel(book: Book) {
//     this.isOrderSidePanelVisible = true;
//     this.isOrderListVisible = false;
//     this.orderSidePanel = {
//       title: `Order - ${book.bookName}`,
//       btnText: 'Place Order',
//       bookName: book.bookName,
//       noOfBooks: 1,
//       total_Price: book.price,
//       orderDate: new Date(),
//       bookId: book.bookId,
//       userId: this.orderSidePanel.userId
//     };
//   }

//   closeOrderSidePanel() {
//     this.isOrderSidePanelVisible = false;
//     this.isOrderListVisible = false;
//     this.orderSidePanel = {
//       title: '',
//       btnText: '',
//       bookName: '',
//       noOfBooks: 0,
//       total_Price: 0,
//       orderDate: new Date(),
//       userId: this.orderSidePanel.userId
//     };
//   }

//   viewOrders() {
//     this.fetchOrders();
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

//   placeOrder() {
//     const orderData = {
//       bookName: this.orderSidePanel.bookName,
//       noOfBooks: this.orderSidePanel.noOfBooks,
//       //total_Price: this.orderSidePanel.total_Price,
//       //userId: this.orderSidePanel.userId,
//       //orderDate: this.orderSidePanel.orderDate,
      
//     };

//     this.http.post('https://localhost:7060/api/Order', orderData, { responseType: 'text' }).subscribe(
//       (resultData) => {
//         console.log(resultData);
//         this.fetchOrders();
//         this.closeOrderSidePanel();
//       },
//       (error) => {
//         console.error('Error placing order:', error);
//       }
//     );
//   }
// }




// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// interface Book {
//   bookId: number;
//   bookName: string;
//   bookAuthor: string;
//   bookDescription: string;
//   price: number;
//   imageURL: string;
// }

// interface Order {
//   orderId: number;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
// }

// interface OrderSidePanel {
//   title: string;
//   btnText: string;
//   bookName: string;
//   noOfBooks: number;
//   total_Price: number;
//   orderDate: Date;
//   bookId?: number;
//   userId: number;
// }

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   isOrderSidePanelVisible: boolean = false;
//   books: Book[] = [];
//   orderSidePanel: OrderSidePanel = {
//     title: '',
//     btnText: '',
//     bookName: '',
//     noOfBooks: 0,
//     total_Price: 0,
//     orderDate: new Date(),
//     userId: 1 // Replace with the actual user ID
//   };

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit() {
//     this.fetchBooks();
//   }

//   fetchBooks() {
//     this.http.get<Book[]>('https://localhost:7060/api/Books').subscribe(
//       (response) => {
//         this.books = response;
//       },
//       (error) => {
//         console.error('Error fetching books:', error);
//       }
//     );
//   }

//   // navigateToOrderComponent() {
//   //   this.router.navigate(['order']);
//   // }

//   openOrderSidePanel(book: Book) {
//     this.isOrderSidePanelVisible = true;
//     this.orderSidePanel = {
//       title: `Order - ${book.bookName}`,
//       btnText: 'Place Order',
//       bookName: book.bookName,
//       noOfBooks: 1,
//       total_Price: book.price,
//       orderDate: new Date(),
//       bookId: book.bookId,
//       userId: this.orderSidePanel.userId
//     };
//   }

//   closeOrderSidePanel() {
//     this.isOrderSidePanelVisible = false;
//     this.orderSidePanel = {
//       title: '',
//       btnText: '',
//       bookName: '',
//       noOfBooks: 0,
//       total_Price: 0,
//       orderDate: new Date(),
//       userId: this.orderSidePanel.userId
//     };
//   }

//   placeOrder() {
//     const orderData = {
//       bookName: this.orderSidePanel.bookName,
//        noOfBooks: this.orderSidePanel.noOfBooks,
//       // total_Price: this.orderSidePanel.total_Price,
//       // userId: this.orderSidePanel.userId,
//       // orderDate: this.orderSidePanel.orderDate,
//       // orderStatus: 'Pending'
//     };

//     this.http.post('https://localhost:7060/api/Order', orderData, { responseType: 'text' }).subscribe(
//       (resultData) => {
//         console.log(resultData);
//         this.closeOrderSidePanel();
//         //this.navigateToOrderComponent();
//       },
//       (error) => {
//         console.error('Error placing order:', error);
//       }
//     );
//   }
// }

