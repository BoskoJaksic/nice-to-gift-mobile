import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-circle-animation',
  templateUrl: './circle-animation.component.html',
  styleUrls: ['./circle-animation.component.scss'],
})
export class CircleAnimationComponent  implements OnInit {
  @Input() showLoader: boolean | null = false;

  constructor() {}

  ngOnInit() {

  }

}
