import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IpaddrService } from '../ipaddr.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  dataList: any;
  public ip_addr: string = '';

  constructor(
    private IpAddrService: IpaddrService,
  ) {
    this.dataList = [];

    for (let i = 0; i < 25; i++) {
      this.dataList.push("Item number " + this.dataList.length);
    }
  }

  loadData(event) {

    this.ip_addr = this.IpAddrService.ip_addr;
    console.log('getItems : ' + this.ip_addr + 'solar_breath/select_sum_all.php' );

    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 25; i++) {
        this.dataList.push("Item number " + this.dataList.length);
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
