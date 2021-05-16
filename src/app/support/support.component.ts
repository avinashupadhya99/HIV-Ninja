import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/providers/authentication.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.userPayload);
  }

}
