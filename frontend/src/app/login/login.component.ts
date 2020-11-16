import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authorizationKey = '';
  public errorMessage = '';

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authorizationKey !== "") {
      this.authService.authorize(this.authorizationKey).subscribe((resp) => {
        localStorage.setItem('authToken', resp.authorizationToken);
        this.router.navigate(['/voting-page']);
      },
      (err) => {
        this.errorMessage = err.error;
      });
    }
  }

}
