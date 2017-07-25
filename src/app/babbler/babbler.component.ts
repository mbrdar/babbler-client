import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'babbler',
  templateUrl: './babbler.component.html',
  styleUrls: ['./babbler.component.css']
})
export class BabblerComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
