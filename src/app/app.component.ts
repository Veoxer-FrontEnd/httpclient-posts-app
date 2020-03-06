import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  errMessage = null;
  ErrSubscription: Subscription;

  constructor(private httpClient: HttpClient, private httpService: HttpService) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.httpService.onCreateAndStorePosts(postData);
    this.ErrSubscription = this.httpService.postError.subscribe(error => {
      this.errMessage = error;
    });
  }

  onFetchPosts() {
    this.fetchAllPosts();
  }

  private fetchAllPosts(){
    this.isFetching = true;
    this.httpService.onFetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.errMessage = error.message;
    });
  }

  onClearErrors(){
    this.errMessage = null;
  }

  onClearPosts() {
    // Send Http request
    this.httpService.onDeletePosts();
    this.loadedPosts = [];
  }

  ngOnDestroy(){
    this.ErrSubscription.unsubscribe();
  }
}
