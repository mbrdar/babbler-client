import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
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

    const source = new EventSource(`${this.backendApi}/comments/event-stream`);
    source.addEventListener('comment-added', (event) => {
      this._comments.push(<Comment> JSON.parse(event.data));
      this._comments$.next(this._comments);
    }, false);
  }

  add(nickname: string, content: string): Observable<any> {
    return this.http.post(`${this.backendApi}/comments`, {nickname: nickname, content: content});
  }

  getComments(): Subject<any> {
    return this._comments$;
  }

  get(): void {
    this.http.get(`${this.backendApi}/comments`)
      .map((response: any) => <Comment[]> response.json())
      .subscribe((comments: Comment[]) => {
        this._comments = comments;
        this._comments$.next(this._comments);
      });
  }
}
