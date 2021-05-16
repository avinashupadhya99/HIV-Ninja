import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/providers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.authenticationService.isLoggedIn) {
      this.router.navigate(['/support']);
    } else {
      this.authenticationService.Sawo.showForm();
    }
  }

}
