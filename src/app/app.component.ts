import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  errMessage = null;

  constructor(private httpClient: HttpClient, private httpService: HttpService) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.httpService.onCreateAndStorePosts(postData);
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
      this.errMessage = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.httpService.onDeletePosts();
    this.loadedPosts = [];
  }

  private fetchPosts(){
    return this.httpClient.get('');
  }
}
