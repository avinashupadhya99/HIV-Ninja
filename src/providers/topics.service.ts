import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics: any[] = [];
  topicsChanged = new Subject<void>();

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
}
