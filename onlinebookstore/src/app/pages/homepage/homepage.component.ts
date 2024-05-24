import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  showMessage = false;
  greeting: string;
  constructor() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = 'Hey, Good Morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = 'Hey, Good Afternoon!';
    } else {
      this.greeting = 'Hey, Good Evening!';
    }
  }
  showLoginMessage() {
    this.showMessage = true;
    
}
}
