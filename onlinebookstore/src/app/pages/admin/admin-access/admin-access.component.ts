  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../BookService.service';

interface Book {
  bookId: number;
  bookName: string;
  bookAuthor: string;
  bookDescription: string;
  price: number;
  imageURl: string;
}

interface SidePanel {
  title: string;
  btnText: string;
  bookName: string;
  bookAuthor: string;
  bookDescription: string;
  price: number;
  imageURl: string;
  bookId?: number;
}

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrl: './admin-access.component.css'

})
export class AdminAccessComponent implements OnInit {
  isSidePanelVisible: boolean = false;

  books: Book[] = [];
  
  sidePanel: SidePanel = {
    title: '',
    btnText: '',
    bookName: '',
    bookAuthor: '',
    bookDescription: '',
    price: 0,
    imageURl: ''
  };

  constructor(private router: Router, private http: HttpClient,private bookService:BookService) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    

    this.bookService.getBooks().subscribe(
      (response) => {
        this.books = response;
      },
      (error) => console.log(error)
    );
  }

  openSidePanel(mode: 'add' | 'update', book?: Book) {
    this.isSidePanelVisible = true;
    if (mode === 'add') {
      this.sidePanel = {
        title: 'Add - New Book',
        btnText: 'Create book',
        bookName: '',
        bookAuthor: '',
        bookDescription: '',
        price: 0,
        imageURl: ''
      };
    } else {
      this.sidePanel = {
        title: 'Update Book',
        btnText: 'Update book',
        bookName: book?.bookName || '',
        bookAuthor: book?.bookAuthor || '',
        bookDescription: book?.bookDescription || '',
        price: book?.price || 0,
        imageURl: book?.imageURl || '',
        bookId: book?.bookId
      };
    }
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
    this.sidePanel = {
      title: '',
      btnText: '',
      bookName: '',
      bookAuthor: '',
      bookDescription: '',
      price: 0,
      imageURl: ''
    };
  }

  onSave() {
    if (this.sidePanel.bookId) {
     
      this.updateBook();
    } else {
      
      this.addBook();
    }
  }

  addBook() {
    const bodyData = {
      bookName: this.sidePanel.bookName,
      bookAuthor: this.sidePanel.bookAuthor,
      bookDescription: this.sidePanel.bookDescription,
      price: this.sidePanel.price,
      imageURl: this.sidePanel.imageURl
    };
    // const storedToken = localStorage.getItem('admin-token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);

    //this.http.post('https://localhost:7060/api/Books', bodyData, { responseType: 'text',headers:headers }).subscribe(
     this.bookService.createBook(bodyData).subscribe(
    (resultData) => {
        console.log(resultData);
        this.fetchBooks(); 
        this.closeSidePanel();
      },
      (error) => console.log(error)
    );
  }

  

  updateBook() {
    // const storedToken = localStorage.getItem('admin-token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);

    const bodyData = {
      bookId: this.sidePanel.bookId,
      bookName: this.sidePanel.bookName,
      bookAuthor: this.sidePanel.bookAuthor,
      bookDescription: this.sidePanel.bookDescription,
      price: this.sidePanel.price,
      imageURl: this.sidePanel.imageURl
    };
    
   // this.http.put(`https://localhost:7060/api/Books/UpdateId/${this.sidePanel.bookId}`, bodyData, { responseType: 'text',headers:headers }).subscribe(
   this.bookService.updateBook(bodyData.bookId,bodyData).subscribe(
    
    (resultData) => {
        console.log(resultData);
        this.fetchBooks(); 
        this.closeSidePanel();
      },
      (error) => console.log(error)
    );
  }

  deleteBook(bookId: number) {
    // const storedToken = localStorage.getItem('admin-token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${storedToken}`);

   // this.http.delete(`https://localhost:7060/api/Books/DeletById/${bookId}`, { responseType: 'text' ,headers:headers}).subscribe(
   this.bookService.deleteBook(bookId).subscribe(
   (resultData) => {
        console.log(resultData);
        this.fetchBooks(); 
      },
      (error) => console.log(error)
    );
  }

  logout() {
   
    localStorage.removeItem('admin-token');

    
    this.router.navigateByUrl('Adminlogin');
  }
}
