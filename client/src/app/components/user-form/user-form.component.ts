import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { AuthenticationService } from '../../services/authenticate.service'

import {  ActivatedRoute , Router } from '@angular/router'
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {
    id: 0,
    nombres: '',
    apellidos: '',
    correo: '',
    celular: '',
    password: '',
    id_tipo_usuario: '',
    token: '',
    fecha_creacion: new Date(),
    fecha_modificacion: new Date()
  };
  constructor(private usersService : UsersService, private router: Router,  private activatedRoute : ActivatedRoute) { 
      


   }

  ngOnInit(): void {
  }
  saveNewUser(){
    delete this.user.fecha_creacion
    delete this.user.id
    delete this.user.fecha_modificacion
    console.log("Guardar Usuario"+this.user);
    this.usersService.saveUser(this.user)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/users/login']);
      },
      err => console.error(err)
    )
    
  }

}
