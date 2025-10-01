import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  departureTime: string = '09:30';

  // Sample flight metadata
  flightNumber: string = 'AI-203';
  seatNumber: string = '';
  bookedUserData: any;
  bookedUserName: any;
  boardingGate: string = '';
  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit() {
    let localData = localStorage.getItem('userName');
    let userName = localData && JSON.parse(localData);
    this.bookedUserName = userName[0]
    let flightData = localStorage.getItem('flightData')
    this.bookedUserData = flightData && JSON.parse(flightData);
    this.generateSeatNumber();
    this.generateBoardingGate();
  }

  generateSeatNumber() {
    const row = Math.floor(Math.random() * 30) + 1;
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const letter = seatLetters[Math.floor(Math.random() * seatLetters.length)];
    this.seatNumber = `${row} ${letter}`;
  }

  generateBoardingGate() {
    // Random gate letter (A–F)
    const gateLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const letter = gateLetters[Math.floor(Math.random() * gateLetters.length)];

    // Random gate number (1–20)
    const number = Math.floor(Math.random() * 20) + 1;

    this.boardingGate = `${letter}${number}`;
  }
}
