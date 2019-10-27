import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onOpenHome() {
    this.router.navigateByUrl('home');
  }
  
  onOpenEvent() {
    this.router.navigateByUrl('event');
  }

  onOpenProfile() {
    this.router.navigateByUrl('profile');
  }

  onLogout() {
    this.loginService.logOut();
    this.router.navigateByUrl('/login');
  }
}
