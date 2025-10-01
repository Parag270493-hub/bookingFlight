import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuType: string = 'default';
  userName: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url === "/dashboard") {
          console.log("in seller area");
          this.menuType = 'flight';
          let localData = localStorage.getItem('userName');
          if (localData) {
            let flightData = localData;
            let bookedUserName = flightData && JSON.parse(flightData);
            this.userName = bookedUserName[0].name;
          }
        } else {
          console.log("outside seller area")
          this.menuType = 'default';
        }
      }
    })
  }
  logout() {
    localStorage.removeItem('flight');
    this.router.navigate(['/'])
  }
}
