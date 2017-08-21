import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../service/comment.service";
import {Comment} from "../model/comment.model";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  id: string;
  title: string;

  @Input('id')
  set newsId(id: string) {
    this.commentService.closeEventStreamConnection();
    this.id = id;
    this.initComments();
  };

  @Input('title')
  set newsTitle(title: string) {
    this.title = title;
  };

  showInfoMessage: boolean = false;
  comments: Array<Comment>;

  constructor(private commentService: CommentService) {
  }

  private initComments(): void {
    this.commentService.getLatestComments(this.id)
      .subscribe((comment: Comment) => {
        this.comments.push(comment);
      });

    this.commentService.getById(this.id)
      .subscribe((comments: Array<Comment>) => {
        if (comments.length) {
          this.comments = comments;
          this.showInfoMessage = false;
        } else {
          this.showInfoMessage = true;
        }
      });
  }
}
