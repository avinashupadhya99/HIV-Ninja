import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/providers/authentication.service';

@Component({
  selector: 'app-add-topic-comment',
  templateUrl: './add-topic-comment.component.html',
  styleUrls: ['./add-topic-comment.component.scss']
})
export class AddTopicCommentComponent implements OnInit {
  @Input() topic;
  authenticationService: AuthenticationService;
  addCommentForm: FormGroup = new FormGroup({
    'comment': new FormControl(null, [Validators.required, Validators.maxLength(350)])
  });

  constructor(authenticationService: AuthenticationService, private store: AngularFirestore) {
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addCommentForm);
    if(this.addCommentForm.valid) {
      console.log(!this.authenticationService.isLoggedIn);
      if(!this.authenticationService.isLoggedIn) {
        this.addCommentForm.setErrors({'notAuthenticated': true});
        return;
      }
      const data = {
        user: this.authenticationService.userPayload.user_id,
        comment: this.addCommentForm.value.comment,
        topic: this.topic,
        created_date: new Date().toJSON().slice(0,10).split('-').reverse().join('-')
      }
      console.log(data);
      this.store.collection('topic-comments').add(data).then(() => {
        this.addCommentForm.reset();
        this.addCommentForm.markAsPristine();
        this.addCommentForm.markAsUntouched();
        this.addCommentForm.updateValueAndValidity();
      }).catch(err => {
        console.error(err);
      })
    }
  }

}
