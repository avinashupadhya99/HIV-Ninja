import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicsService } from 'src/providers/topics.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topic: any;
  comments: any[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private topicsService: TopicsService) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.topic = this.router.getCurrentNavigation().extras.state;
      console.log(this.topic);
      this.comments = this.topicsService.getCommentsByTopicID(this.topic.id);
      console.log(this.comments);
    } else {
      this.activatedRoute.params.subscribe(async (params) => {
        const id = params['id'];
        console.log(id);
        this.topic = await this.topicsService.getTopicByID(id);
        this.comments = this.topicsService.getCommentsByTopicID(this.topic.id);
        console.log(this.comments);
      });
    }

    this.topicsService.commentsChanged.subscribe(() => {
      this.comments = this.topicsService.getCommentsByTopicID(this.topic.id);
      console.log(this.comments);
    });
  }

  ngOnInit(): void {
  }

}
