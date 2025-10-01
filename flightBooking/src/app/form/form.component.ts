import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SingnUp } from '../dataType';
import { FlightService } from '../service/flight.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  showLogin = false;
  registrationErrorMessage: string = '';
  addProductMessage: string = '';
  constructor(private router: Router, private http: HttpClient, private flightService: FlightService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.flightService.reloadUser();
  }

  userSignUp(data: SingnUp) {
    this.flightService.signUp(data);
  }

  signIn(data: Login) {
    this.flightService.userLogin(data);
    this.flightService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.toastr.error("Email or Password is incorrect")
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
