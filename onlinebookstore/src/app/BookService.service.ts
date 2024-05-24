import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Admin Acess
export interface Book {
  bookId: number;
  bookName: string;
  bookAuthor: string;
  bookDescription: string;
  price: number;
  imageURl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService 
{
  private baseUrl = 'https://localhost:7060/api/Books';
  private orderUrl = 'https://localhost:7060/api/Order';
  

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  createBook(book: any): Observable<Object> {
    const storedToken = localStorage.getItem('admin-token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);
    return this.http.post(`${this.baseUrl}`, book, { responseType: 'text',headers:headers });
  }

  updateBook(id: number, value: any): Observable<Object> {
    const storedToken = localStorage.getItem('admin-token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);
    return this.http.put(`https://localhost:7060/api/Books/UpdateId/${id}`, value, { responseType: 'text',headers:headers });
    // this.http.put(`https://localhost:7060/api/Books/UpdateId/${this.sidePanel.bookId}`, bodyData, { responseType: 'text',headers:headers }).subscribe(

  }

  deleteBook(id: number): Observable<any> {
    const storedToken = localStorage.getItem('admin-token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);
    return this.http.delete(`${this.baseUrl}/DeletById/${id}`, { responseType: 'text' ,headers:headers});
  }


  getOrders(): Observable<any[]> {
    const storedToken = localStorage.getItem('admin-token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);
    return this.http.get<any[]>(this.orderUrl);
  }


  //----------------------------------------UserAcess----------------------------------------------//

  getAllOrders(jwtToken: string): Observable<any[]> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${jwtToken}`
    });
    return this.http.get<any[]>(this.baseUrl, {headers});
  }

  cancelOrder(orderId: number, jwtToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${jwtToken}`);
    return this.http.delete(`${this.baseUrl}/${orderId}`, { headers });
  }
}


