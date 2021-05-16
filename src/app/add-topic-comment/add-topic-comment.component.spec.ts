import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicCommentComponent } from './add-topic-comment.component';

describe('AddTopicCommentComponent', () => {
  let component: AddTopicCommentComponent;
  let fixture: ComponentFixture<AddTopicCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopicCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
