import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SingnUp } from '../dataType';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  signUp(data: SingnUp): void {
    this.http.post('http://localhost:3000/info',
      data,
      { observe: 'response' }
    ).subscribe((result) => {
      // localStorage.setItem('flight', JSON.stringify(result.body))
      this.toastr.success(`Registration is done successfully for ${data.name}`);
    });
  }

  reloadUser() {
    if (localStorage.getItem('flight')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['dashboard']);
    }
  }

  userLogin(data: Login) {
    this.http.get(`http://localhost:3000/info?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem('userName', JSON.stringify(result.body))
        let flightData = localStorage.getItem('userName');
        let bookedUserName = flightData && JSON.parse(flightData)
        this.toastr.success(`${bookedUserName[0].name} Successfully Logged In`)
        console.log("hi")
        this.router.navigate(['dashboard']);
      } else {
        this.isLoginError.emit(true);
      }
    })
  }
}
