import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-comments',
  templateUrl: './topic-comments.component.html',
  styleUrls: ['./topic-comments.component.scss']
})
export class TopicCommentsComponent implements OnInit {
  @Input() comment;
  constructor() { }

  ngOnInit(): void {
  }

}
