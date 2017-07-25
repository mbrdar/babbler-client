import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../service/comment.service";
import {Subject} from "rxjs/Subject";
import {Comment} from "../model/comment.model";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;

  showInfoMessage: boolean = false;
  comments$: Subject<any>;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.commentService.get(this.id);
    this.commentService.initEventSource(this.id);
    this.comments$ = this.commentService.getComments();

    this.comments$
      .subscribe((comments: Array<Comment>) => {
        if (comments.length) {
          this.showInfoMessage = false;
        } else {
          this.showInfoMessage = true;
        }
      })
  }

}
