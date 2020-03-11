import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-report-port',
  templateUrl: './report-port.page.html',
  styleUrls: ['./report-port.page.scss'],
})
export class ReportPortPage implements OnInit {
  public queryDate: string = ''; // เก็บข้อความที่ใช้ค้น
  
  constructor(
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  getItems() {
  
    this.queryDate = this.queryDate.substring(0, 10);
    console.log('getItems click '+ this.queryDate + ' is OK ');
  }

  async doHelp() {
    {
      const alert = this.alertCtrl.create({
        header: 'Help',
        subHeader: 'วิธีใช้ ',
        message: 'ใส่ วันเดือนปี ที่ต้องการค้นหา' + '<br>' , 
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              //console.log('Confirm Ok');
            }
          }
        ]
      }).then(alert => alert.present());
    }

  }

}
