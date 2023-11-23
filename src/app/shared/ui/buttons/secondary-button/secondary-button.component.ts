import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent  implements OnInit {
  @Input() disabled: boolean = true;
  @Input() spinner: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

}
