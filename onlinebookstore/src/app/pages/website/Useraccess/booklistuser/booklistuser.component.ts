import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
interface Book {
  bookId: number;
  bookName: string;
  bookAuthor: string;
  bookDescription: string;
  price: number;
  imageURL: string;
}

interface SidePanel {
  title: string;
  btnText: string;
  bookName: string;
  bookAuthor: string;
  bookDescription: string;
  price: number;
  imageURL: string;
  bookId?: number;
}
@Component({
  selector: 'app-booklistuser',
  templateUrl: './booklistuser.component.html',
  styleUrl: './booklistuser.component.css'
})
export class BooklistuserComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  books: Book[] = [];
  sidePanel: SidePanel = {
    title: '',
    btnText: '',
    bookName: '',
    bookAuthor: '',
    bookDescription: '',
    price: 0,
    imageURL: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchBooks();
  }

  // fetchBooks() {
  //   this.http.get<Book[]>('https://localhost:7060/api/Books').subscribe(
  //     (response) => {
  //       this.books = response;
  //     },
  //     (error) => console.log(error)
  //   );
  // }
  selectedFile: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  
  fetchBooks() {
    this.http.get<Book[]>('https://localhost:7060/api/Books').subscribe(
      (response) => {
        this.books = response.map(book => ({
          ...book,
          imageURL: book.imageURL || 'https://www.bookswagon.com/productimages/images200/676/9780143452676.jpg' // Use a default image URL if none is provided
        }));
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
        imageURL: ''
      };
    } else {
      this.sidePanel = {
        title: 'Update Book',
        btnText: 'Update book',
        bookName: book?.bookName || '',
        bookAuthor: book?.bookAuthor || '',
        bookDescription: book?.bookDescription || '',
        price: book?.price || 0,
        imageURL: book?.imageURL || '',
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
      imageURL: ''
    };
  }

  onSave() {
    if (this.sidePanel.bookId) {
      // Update book
      this.updateBook();
    } else {
      // Add new book
      this.addBook();
    }
  }

  addBook() {
    const bodyData = {
      bookName: this.sidePanel.bookName,
      noOfBooks: this.sidePanel.bookAuthor,
      // bookDescription: this.sidePanel.bookDescription,
      // price: this.sidePanel.price,
      // imageURL: this.sidePanel.imageURL
    };

    this.http.post('https://localhost:7060/api/Order', bodyData, { responseType: 'text' }).subscribe(
      (resultData) => {
        console.log(resultData);
        this.fetchBooks(); // Refresh the books list
        this.closeSidePanel();
      },
      (error) => console.log(error)
    );
  }

  updateBook() {
    const bodyData = {
      bookName: this.sidePanel.bookName,
      bookAuthor: this.sidePanel.bookAuthor,
      bookDescription: this.sidePanel.bookDescription,
      price: this.sidePanel.price,
      imageURL: this.sidePanel.imageURL
    };

    this.http.put(`https://localhost:7060/api/Books/DeleteById/${this.sidePanel.bookId}`, bodyData, { responseType: 'text' }).subscribe(
      (resultData) => {
        console.log(resultData);
        this.fetchBooks(); // Refresh the books list
        this.closeSidePanel();
      },
      (error) => console.log(error)
    );
  }

  deleteBook(bookId: number) {
    this.http.delete(`https://localhost:7060/api/Books/DeletById/${bookId}`, { responseType: 'text' }).subscribe(
      (resultData) => {
        console.log(resultData);
        this.fetchBooks(); // Refresh the books list
      },
      (error) => console.log(error)
    );
  }
}

