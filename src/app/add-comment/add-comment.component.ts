import {Component} from '@angular/core';
import {CommentService} from '../service/comment.service';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  showError: boolean = false;

  _clickStream$ = new Subject();

  commentForm: FormGroup;

  constructor(private _commentService: CommentService, private _fb: FormBuilder) {

    this.commentForm = _fb.group({
      'nickname': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'content': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this._clickStream$
      .debounceTime(250)
      .subscribe(() => {
      if (this.commentForm.valid) {
        this.showError = false;
        this._commentService.add(this.commentForm.controls.nickname.value, this.commentForm.controls.content.value)
          .subscribe((success) => {
              this.showError = false;
              this.commentForm.reset();
            },
            (error) => {
              this.showError = true;
            });
      }
    });
  }

}
