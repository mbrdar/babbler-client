import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../service/comment.service";
import {Comment} from "../model/comment.model";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id: string;
  title: string;

  @Input('id')
  set newsId(id: string) {
    this.id = id;
    this.ngOnInit();
  };

  @Input('title')
  set newsTitle(title: string) {
    this.title = title;
  };

  showInfoMessage: boolean = false;
  comments: Array<Comment>;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
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
      })
  }

}
