import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IpaddrService } from '../ipaddr.service';


interface resultData {
  curPage: number,
  perPage: number,
  totalData: number,
  countData: number,
  totalPage: number,
  allData: number,
  stopPage: string,
  create_date: string,
  data: any[]
}

@Component({
  selector: 'app-nodelist',
  templateUrl: './nodelist.page.html',
  styleUrls: ['./nodelist.page.scss'],
})
export class NodelistPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public queryText: string = ''; // เก็บข้อความที่ใช้ค้น
  public results: any; // ไว้รับข้อมูล
  public sorttype: string = ''; // เก็บรุปแบบเงื่อนไขการเรียงข้อมูล
  public page: number = 1;
  public totalData: number = 0;
  public allData: number = 0;
  public countData: number = 0;
  public totalPage: number = 0;
  public perPage: number = 0;
  public curPage: number = 0;
  public create_date: string = 'YYYY-MM-DD';
  public data: any[] = [];
  public stopPage: string = 'n';  // for end IonInfiniteScroll
  public ip_addr: string = '';
  loaderToShow: any;
  sub: Subscription;

  constructor(
    private IpaddrService: IpaddrService,
    private alertCtrl: AlertController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private toastController: ToastController,

  ) {
    //console.log('run first'); 
    //this.getItems();
  }

  ngOnInit() {
    this.presentLoading();
    ////// ทำครั้งแรกเมื่อโหลด  หรือ click ปุ่ม
    this.getItems();
    this.hideLoader();
  }

  getItems() {
    this.ip_addr = this.IpaddrService.ip_addr;
    //console.log('getItems' + this.ip_addr + 'solar_breath/select_sum_all.php?queryString=' + this.queryText + '&page=' + this.page);
   
    
    this.page = 1;
    this.sub = this.http.get(
      this.ip_addr + 'solar_breath/select_sum_all.php?queryString=' + this.queryText + '&page=' + this.page
    ).subscribe((result: resultData) => {
      //this.data = this.data.concat(result.data);
      this.data = result.data;
      this.page = result.curPage;
      this.totalData = result.totalData;
      this.countData = result.countData;
      this.totalPage = result.totalPage;
      this.perPage = result.perPage;
      this.curPage = result.curPage;
      this.results = result.data;
      this.stopPage = result.stopPage;
      this.create_date = result.create_date;
    });
    
  }

  doInfinite(event) {
    setTimeout(() => {
      //console.log('doInfinite Done');
      this.ip_addr = this.IpaddrService.ip_addr;
      this.page = this.page + 1;
      this.sub = this.http.get(
        this.ip_addr + 'solar_breath/select_sum_all.php?queryString=' + this.queryText + '&page=' + this.page
      ).subscribe((result: resultData) => {
        this.data = this.data.concat(result.data);
        this.page = result.curPage;
        this.totalData = result.totalData;
        this.countData = result.countData;
        this.totalPage = result.totalPage;
        this.perPage = result.perPage;
        this.curPage = result.curPage;
        this.results = result.data;
        this.stopPage = result.stopPage;
        this.create_date = result.create_date;
      });
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      //   if (this.stopPage == 'y') {
      //     event.target.disabled = true;
      //   }
    }, 500);
  }

  ngOnDestroy() {
    // unsubscribe เพื่อคืนหน่วยความจำ
    this.sub.unsubscribe();
  }

  async doHelp() {
    {
      const alert = this.alertCtrl.create({
        header: 'Help',
        subHeader: 'วิธีใช้ : ใส่ชื่อ Node ที่ต้องการค้นหา',
        message: '1. ไม่จำเป็นต้องพิมพ์ให้เต็ม' + '<br>' +
          '2. การค้นหาเป็นแบบ wildcard %' + '<br>' +
          '3. Default Date คือเมื่อวานนะ',
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

  presentLoading() {
    this.loadingCtrl.create({
      message: 'ช้าๆ ได้พร้าเล่มงาม ',
      duration: 1000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 1 Seconds');
      });
    });
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 500);
  }

  async presentToast(data) {
    const toast = await this.toastController.create({
      header: 'Node Name : ' + data.node_name,
      message: 'IP Address : ' + data.ip_address +
        '<br>Region: ' + data.region +
        '<br>Type : ' + data.type +
        '<br>Port Total: ' + data.total_ports +
        '<br>Port Used: ' + data.used_ports +
        '<br>Port Avaliable : ' + data.avaliable_ports +
        '<br>Port Up: ' + data.up +
        '<br>Port Down : ' + data.down +
        '<br>Admin Down : ' + data.admin_down +
        '<br>Time Stamp : ' + data.stamp,  
      position: 'middle',
      color: 'primary',
      buttons: [
        /*
        {
          side: 'start',
          icon: 'star',
          text: 'Detail',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, 
        */
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          //handler: () => {
          //console.log('Cancel clicked');
          //}
        }
      ]
    });
    toast.present();
  }

  async summary(totalData, countData, queryText, create_date) {
    {
      const alert = this.alertCtrl.create({
        header: 'Summary',
        subHeader: 'สรุป Query Status',
        message: '# ข้อมูลทั้งหมด = ' + totalData + '<br>' +
          '# คำค้นหา = ' + queryText + '<br>' +
          '# ข้อมูลที่หาได้ = ' + countData + '<br>' +
          '# Create Date = ' + create_date + '<br>',

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