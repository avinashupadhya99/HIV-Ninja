import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/providers/authentication.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  authenticationService: AuthenticationService;
  createTopicForm: FormGroup = new FormGroup({
    'topic': new FormControl(null, [Validators.required, Validators.maxLength(350)])
  })

  constructor(authenticationService: AuthenticationService, private store: AngularFirestore) {
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.createTopicForm);
    if(this.createTopicForm.valid) {
      console.log(!this.authenticationService.isLoggedIn);
      if(!this.authenticationService.isLoggedIn) {
        this.createTopicForm.setErrors({'notAuthenticated': true});
        return;
      }
      const data = {
        user: this.authenticationService.userPayload.user_id,
        topic: this.createTopicForm.value.topic
      }
      console.log(data);
      this.store.collection('topics').add(data).then(() => {
        this.createTopicForm.reset();
        this.createTopicForm.markAsPristine();
        this.createTopicForm.markAsUntouched();
        this.createTopicForm.updateValueAndValidity();
      }).catch(err => {
        console.error(err);
      })
    }
  }

}
