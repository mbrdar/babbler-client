import {Inject, Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../model/comment.model';
import "rxjs/add/operator/map";
import * as EventSource from 'eventsource';

@Injectable()
export class CommentService {

  constructor(@Inject('BACKEND_API_URL') private backendApi: string, private http: Http) {
  }

  add(comment: Comment): Observable<any> {
    return this.http.post(`${this.backendApi}/comments`, comment);
  }

  getLatestComments(id: string): Observable<Comment> {
    return Observable.create(observer => {
      const eventSource = new EventSource(`${this.backendApi}/comments/event-stream?newsId=${id}`);
      eventSource.addEventListener('comment-added', (event) => {
        observer.next(<Comment> JSON.parse(event.data));
      }, false);

    })
  }

  getById(id: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('newsId', id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    return this.http.get(`${this.backendApi}/comments`, requestOptions)
      .map((response: any) => <Comment[]> response.json());
  }
}
