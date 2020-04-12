import { Component, OnInit } from '@angular/core';  
import { ConfirmationDialogService } from './../../services/confirm-dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticate.service';
import { User } from '../../models/User';
import { Route } from '@angular/compiler/src/core';
@Component({ 
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public currentUser;
  public idUsuario;
  public id_tipo_usuario
  constructor(private authenticationService : AuthenticationService, private router : Router) { 
    console.log ("Valida si el usuario esta logeado")
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.idUsuario = localStorage.getItem('idUsuario')? JSON.parse(localStorage.getItem('idUsuario')) : '';
    this.id_tipo_usuario = localStorage.getItem('id_tipo_usuario')? JSON.parse(localStorage.getItem('id_tipo_usuario')) : '';

  }

  ngOnInit(): void {
  } 

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/users/login']);
}
 
} 


