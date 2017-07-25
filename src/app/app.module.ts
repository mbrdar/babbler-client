import {BrowserModule} from '@angular/platform-browser';
import {Inject, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BabblerComponent} from './babbler/babbler.component';
import {AddCommentComponent} from './add-comment/add-comment.component';
import {CommentsComponent} from './comments/comments.component';
import {HttpModule} from '@angular/http';
import {CommentService} from './service/comment.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderByDatePipe} from './pipe/order-by-date.pipe';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    BabblerComponent,
    AddCommentComponent,
    CommentsComponent,
    OrderByDatePipe,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    CommentService,
    {provide: 'BACKEND_API_URL', useValue: 'http://localhost:8080'}
  ],
  bootstrap: [AppComponent],
  exports: [BabblerComponent]
})
export class BabblerClient {
}
