import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../services/authenticate.service';
import { AlertService } from '../../services/alert.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public username: string;
  public password: string;

  user: any = {
    id: 0,
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    id_tipo_usuario: '',
    token: '',
    fecha_creacion: new Date(),
    fecha_modificacion: new Date()
  }
    ;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {
    console.log("Valida si el usuario esta logeado")
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }



  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // for accessing to form fields
  get f() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    if (this.loginForm.invalid) {
      return;
    }


    this.loading = true;
    this.authenticationService.login(this.user)
      .subscribe(
        data => {
          this.router.navigate(['/products/add']);
        },
        error => {
  
          this.alertService.error(error);
          console.log(error)
          this.loading = false;
        });
  }
}