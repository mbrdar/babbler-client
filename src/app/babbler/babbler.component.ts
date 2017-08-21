import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'babbler',
  templateUrl: './babbler.component.html',
  styleUrls: ['./babbler.component.css']
})
export class BabblerComponent implements OnInit {

  id: string;
  title: string;

  @Input('id')
  set newsId(id: string) {
    this.id = id;
  };

  @Input('title')
  set newsTitle(title: string) {
    this.title = title;
  };

  constructor() {
  }

  ngOnInit() {
  }

}
