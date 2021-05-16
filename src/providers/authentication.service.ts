import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(private router: Router, private store: AngularFirestore) {
    const sawoConfig = {
      // should be same as the id of the container
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "email",
      // Add the API key
      apiKey: environment.sawo.apiKey,
      // Add a callback here to handle the payload sent by sdk
      onSuccess: async (payload: any) => {
        this.userPayload = payload;
        this.isLoggedIn = true;
        const userRef = this.store.collection('users').doc(payload.user_id);
        const doc: any = await userRef.get();
        console.log(doc);
        if (!doc.exists) {
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['/support']);
        }
      }
    };
    // creating instance
    this.Sawo = new Sawo(sawoConfig)
  }
}
