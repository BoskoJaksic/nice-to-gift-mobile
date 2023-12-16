import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-not-logged-in-state',
  templateUrl: './not-logged-in-state.component.html',
  styleUrls: ['./not-logged-in-state.component.scss'],
})
export class NotLoggedInStateComponent implements OnInit {

  constructor(private commonService:CommonService) {
  }

  login() {
    this.commonService.goToRoute('')
  }

  ngOnInit() {
  }

}
