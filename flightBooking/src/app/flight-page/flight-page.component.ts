import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../service/flight.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowListComponent } from '../show-list/show-list.component';

@Component({
  selector: 'app-flight-page',
  imports: [CommonModule, FormsModule, ShowListComponent],
  templateUrl: './flight-page.component.html',
  styleUrl: './flight-page.component.scss'
})
export class FlightPageComponent {
  listOfFlightSearch: any;
  showFlightTable: boolean = false;
  constructor(private http: HttpClient, private route: Router, private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.reloadUser();
  }
  flightSearch(data: any) {
    this.http.get('http://localhost:3000/list').subscribe((result: any) => {
      this.listOfFlightSearch = result.filter((flight: any) => flight.from.toLowerCase() == data.where.toLowerCase() || flight.to.toLowerCase() == data.where.toLowerCase());
      this.showFlightTable = true;
    })
  }
}
