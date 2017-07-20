import { Component, OnInit } from '@angular/core';
import {CommentService} from "../service/comment.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments$: Subject<any>;

  constructor(private commentService: CommentService) {
    this.commentService.get();
    this.comments$ = this.commentService.getComments();
  }

  ngOnInit() {
  }

}
