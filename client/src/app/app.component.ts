import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  AuthenticationService } from './services/authenticate.service'
import { User } from './models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  title = 'Compra Venta AES';

  currentUser: User;

  constructor(
    private router: Router, private authenticationService: AuthenticationService
) {
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

}
