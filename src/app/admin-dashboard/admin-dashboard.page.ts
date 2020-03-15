import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { LoadingController, AlertController, MenuController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IpaddrService } from '../ipaddr.service';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

interface resultData {
  cus_id: string,
  ncd_customer1: string,
  ncd_device: any[],
  companyName: string,
  Product_Name: string,
  customerTypeName: string,
  customerId: string,
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  bars: any;
  colorArray: any;
  /////// data from json
  public ncd_device: any[] = [];
  public cus_id: string = '';
  public ncd_customer1: string = '';
  /////// end data from json
  public ip_addr: string = '';
  public ip_addr2: string = '';
  public ip_addr3: string = '';
  public service_id: string = '0213300mml0129';

  public companyName: string = '';
  public Product_Name: string = '';
  public customerTypeName: string = '';
  public customerId: string = '';
  sub: Subscription;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private IpaddrService: IpaddrService,
    private alertCtrl: AlertController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    //// disable menu
    this.menu.enable(false);
    this.presentLoading();
    ////// ทำครั้งแรกเมื่อโหลด  หรือ click ปุ่ม

    this.chart_doughnut();

    this.getItems();
    this.getCust();
    this.hideLoader();

  }

  getItems() {
    this.ip_addr3 = this.IpaddrService.ip_addr3;
    //console.log('getItems' + this.ip_addr + 'solar_breath/select_sum_all.php?queryString=' + this.queryText + '&page=' + this.page);
    this.sub = this.http.get(
      this.ip_addr + this.service_id
    ).subscribe((result: resultData) => {
      this.ncd_device = result.ncd_device;
      this.cus_id = result.cus_id;
      this.ncd_customer1 = result.ncd_customer1;
     
    });
  }


  getCust() {
    this.ip_addr2 = this.IpaddrService.ip_addr2;
    this.sub = this.http.get(
      this.ip_addr2 + this.service_id
    ).subscribe((result: resultData) => {
      this.companyName = result.companyName;
      this.Product_Name = result.Product_Name;
      this.customerTypeName = result.customerTypeName;
      this.customerId = result.customerId;
      //console.log('This is Test = '+ this.ip_addr2 + this.service_id );

    });

  }

  goHome() {
    this.navCtrl.navigateForward('/home');
    this.menu.enable(true);
  }

  ngOnDestroy() {
    /// เปิด side menu
    this.menu.enable(true);
  }

  chart_doughnut() {
    var ctx = (<any>document.getElementById('doughnut-chart')).getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
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


}


