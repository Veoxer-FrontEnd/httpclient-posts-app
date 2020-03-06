import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  onCreateAndStorePosts(post: Post){
    this.http.post('', post).subscribe();
    }

  onFetchPosts(){
    return this.http.get<Post[]>('')
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for(let post of responseData){
          postsArray.push({...post});
        }
      return postsArray;
      })); 
  }

  onDeletePosts(){
    this.http.delete('').subscribe();
  }
}
