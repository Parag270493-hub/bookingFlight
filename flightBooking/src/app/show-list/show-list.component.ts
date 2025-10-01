import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-list',
  imports: [FormsModule, NgFor],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss'
})
export class ShowListComponent {
  @Input() showFlightSearch: any
  showTable: boolean = false;

  constructor(private router: Router) { }

  showLoginForm() {
    Swal.fire({
      text: 'Before Booking, Please Singup',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([''])
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
