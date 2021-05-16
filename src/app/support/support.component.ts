import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopicsService } from 'src/providers/topics.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, OnDestroy {
  topics: any[];
  topicsSubscription: Subscription = new Subscription;

  constructor(private router: Router, private topicsService: TopicsService) {
    this.topicsSubscription = this.topicsService.topicsChanged.subscribe(() => {
      this.topics = this.topicsService.topics;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.topicsSubscription.unsubscribe();
  }

  redirectToTopic(topic): void {
    this.router.navigate(['/topic/',topic.id], { state: topic });
  }

}
