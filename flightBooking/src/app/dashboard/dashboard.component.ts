import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listOfFlight: any;
  showFlightList: boolean = false;
  flightBookedMessage: string = '';
  showNameOfDepature: any;
  showNameOfDestination: any;
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private route: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('flightData')) {
      this.isUserLoggedIn.next(true);
      // this.route.navigate(['/']);
    }
  }

  ticketBook(data: any) {
    this.showNameOfDepature = data.from
    this.showNameOfDestination = data.to
    this.http.get('http://localhost:3000/list').subscribe((result: any) => {
      let selectedFlightsDetails = result.filter((flight: any) => flight.from.toLowerCase() == data.from.toLowerCase() && flight.to.toLowerCase() == data.to.toLowerCase())
      this.showFlightList = true;
      this.listOfFlight = selectedFlightsDetails;
    })
    this.bookNow(data);
  }
  bookNow(data: any) {
    localStorage.setItem('flightData', JSON.stringify(data));
    this.http.post('http://localhost:3000/dashboard',
      data,
      { observe: 'response' }
    ).subscribe((result: any) => {
    });

  }
  bookFlight(item: any) {
    localStorage.setItem('bookedData', JSON.stringify(item));
    Swal.fire({
      text: 'Are you sure want to book the ticket',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.flightBookedMessage = `Ticket is Booked from ${this.showNameOfDepature} to ${this.showNameOfDestination}`;
        this.toastr.success('Ticket is Booked');
        this.route.navigate(['ticket'])
      } else {
        this.route.navigate(['dashboard']);
      }
    });
  }
}
