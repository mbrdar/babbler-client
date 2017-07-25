import {Inject, Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import * as EventSource from 'eventsource';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../model/comment.model';
import "rxjs/add/operator/map";

@Injectable()
export class CommentService {

  private _comments: Array<Comment>;
  private _comments$ = new Subject<any>();

  constructor(@Inject('BACKEND_API_URL') private backendApi: string, private http: Http) {
  }

  add(comment: Comment): Observable<any> {
    return this.http.post(`${this.backendApi}/comments`, comment);
  }

  getComments(): Subject<any> {
    return this._comments$;
  }

  initEventSource(id: string) {
    const source = new EventSource(`${this.backendApi}/comments/event-stream?newsId=${id}`);
    source.addEventListener('comment-added', (event) => {
      this._comments.push(<Comment> JSON.parse(event.data));
      this._comments$.next(this._comments);
    }, false);
  }

  get(id: string): void {
    const params: URLSearchParams = new URLSearchParams();
    params.set('newsId', id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this.http.get(`${this.backendApi}/comments`, requestOptions)
      .map((response: any) => <Comment[]> response.json())
      .subscribe((comments: Comment[]) => {
        this._comments = comments;
        this._comments$.next(this._comments);
      });
  }
}
