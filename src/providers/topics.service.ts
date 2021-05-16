import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics: any[] = [];
  comments: any[] = [];
  topicsChanged = new Subject<void>();
  commentsChanged = new Subject<void>();

  constructor(private store: AngularFirestore) {
    const topicsCollection = this.store.collection('topics').ref;
    topicsCollection.onSnapshot(querySnapshot => {
      let tops = [];
      querySnapshot.docs.forEach(async (topicDoc: any) => {
        let topicData = topicDoc.data();
        const userDoc: any  = await this.store.collection('users').doc(topicDoc.data().user).ref.get();
        if(userDoc.exists) {
          topicData.userDetails = userDoc.data();
        }
        topicData.id = topicDoc.id;
        tops.push(topicData);
      });
      this.topics = tops;
      console.log(this.topics);
      this.topicsChanged.next();
    });


    this.store.collection('topic-comments').ref.onSnapshot(async (querySnapshot) => {
      let comms = [];
      console.log(querySnapshot.docs);
      // querySnapshot.docs.forEach(async (commentDoc: any) => {
      for(let commentDoc of querySnapshot.docs) {
        console.log(commentDoc.data());
        let commentData:any = commentDoc.data();
        const userDoc: any  = await this.store.collection('users').doc(commentData.user).ref.get();
        if(userDoc.exists) {
          commentData.userDetails = userDoc.data();
        }
        commentData.id = commentDoc.id;
        console.log(commentData);
        comms.push(commentData);
      }
      this.comments = comms;
      console.log(this.comments);
      this.commentsChanged.next();
    });
  }

  async getTopicByID(id: string) {
    const topicDoc: any = await this.store.collection('topics').doc(id).ref.get();
    if(topicDoc.exists) {
      let topicData = topicDoc.data();
      const userDoc: any  = await this.store.collection('users').doc(topicDoc.data().user).ref.get();
      if(userDoc.exists) {
        topicData.userDetails = userDoc.data();
      }
      topicData.id = topicDoc.id;
      return topicData;
    } else {
      // Handle 404
    }
  }

  getCommentsByTopicID(topicID: string) {
    console.log(this.comments);
    return this.comments.filter(comment => comment.topic == topicID);
  }
}
