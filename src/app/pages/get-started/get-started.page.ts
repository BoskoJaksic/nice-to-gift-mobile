import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {StorageService} from "../../shared/services/storage.service";

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {
  userName = ''

  constructor(public commonService: CommonService, private storageService: StorageService) {
  }

  async ngOnInit() {
    this.userName = await this.storageService.getItem('userName')
  }

}
