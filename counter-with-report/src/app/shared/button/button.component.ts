import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() name = 'sample';
  @Output() onClick = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
