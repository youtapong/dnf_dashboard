import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      src: '/assets/svg/home-1.svg'
    },
    {
      title: 'Admin DashBoard',
      url: '/admin-dashboard',
      src: '/assets/svg/folder-1.svg'
    },
    {
      title: 'DashBoard',
      url: '/dashboard',
      src: '/assets/svg/folder-1.svg'
    },
    {
      title: 'Report Port',
      url: '/report-port',
      src: '/assets/svg/folder-1.svg'
    },
    {
      title: 'Node List',
      url: '/nodelist',
      src: '/assets/svg/eyeglasses.svg'
    },
    {
      title: 'DashBoard_BK',
      url: '/report',
      src: '/assets/svg/eyeglasses.svg'
    },
    {
      title: 'About Us',
      url: '/about',
      src: '/assets/svg/user-7.svg'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
