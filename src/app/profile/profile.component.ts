import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/providers/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  hivOptions: string[] = [
    'Yes', 'No', 'Prefer not to say'
  ];
  userProfileForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    'age': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    'email': new FormControl({value: this.authenticationService.userPayload.identifier, disabled: true}, [Validators.required]),
    'hiv': new FormControl(null, [Validators.required])
  });
  constructor(private authenticationService: AuthenticationService, private router: Router, private store: AngularFirestore) { }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    console.log(this.userProfileForm);
    if(this.userProfileForm.valid) {
      let userPayload  = this.authenticationService.userPayload;
      userPayload.name = this.userProfileForm.value.name;
      userPayload.age = this.userProfileForm.value.age;
      userPayload.hiv = this.userProfileForm.value.hiv;

      this.authenticationService.userPayload = userPayload;

      this.store.collection('users').doc(this.authenticationService.userPayload.user_id).update(userPayload).then(() => {
        this.router.navigate(['/support']);
      })
    } else {
      this.userProfileForm.markAllAsTouched();
    }
  }

}
