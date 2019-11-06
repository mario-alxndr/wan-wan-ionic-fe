import { Component, OnInit } from '@angular/core';
// import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    // this.loginService.logIn();
    this.router.navigateByUrl('/home/main');
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
