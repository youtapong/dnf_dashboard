import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public checkLogin: string = '';

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,

  ) {
    this.checkLogin = this.route.snapshot.paramMap.get('checkLogin');
    console.log(this.checkLogin);
  }


 

  goAbout_us() {
    this.navCtrl.navigateForward('/about');
  }

  goReport() {
    this.navCtrl.navigateForward('/report');
  }

  goNodeList() {
    this.navCtrl.navigateForward('/nodelist');
  }


}

