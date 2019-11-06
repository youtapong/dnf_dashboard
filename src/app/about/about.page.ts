import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
//import { IpServiceService } from '../ip-service.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public ip_addr: string = '';

  constructor(
    private navCtrl: NavController,
    //private ipServiceService: IpServiceService,
    ) { }

  ngOnInit() {
    //this.ip_addr = this.ipServiceService.ip_addr;
    //console.log(this.ip_addr);
  }

  goToHome() {
    //this.navCtrl.navigateForward('/home');
    this.navCtrl.navigateRoot('/home');
  };
  //this.navCtrl.setRoot(ContactPage);
}


