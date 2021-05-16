import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Sawo from "sawo";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Sawo: any;
  isLoggedIn:boolean = false;
  userPayload:any = {};

  constructor(private router: Router) {
    const sawoConfig = {
      // should be same as the id of the container
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "phone_number_sms",
      // Add the API key
      apiKey: environment.sawo.apiKey,
      // Add a callback here to handle the payload sent by sdk
      onSuccess: (payload: any) => {
        this.userPayload = payload;
        this.isLoggedIn = true;
        this.router.navigate(['/support']);
      }
    };
    // creating instance
    this.Sawo = new Sawo(sawoConfig)
  }
}
