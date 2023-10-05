import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit() {
  }

}
