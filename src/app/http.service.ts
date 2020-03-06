import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  postError = new Subject<string>();
  constructor(private http: HttpClient) { }

  onCreateAndStorePosts(post: Post){
    this.http.post('', post).subscribe(data => {},
      error => this.postError.next(error.message));
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
      }),
      catchError(error => {
        return throwError(error);
      })
      ); 
  }

  onDeletePosts(){
    this.http.delete('').subscribe();
  }
}
