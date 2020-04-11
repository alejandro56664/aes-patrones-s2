import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { User } from '../../models/User'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../services/authenticate.service';
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // for accessing to form fields
  get fval() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;
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
          this.toastr.error(error.message, 'Error');
          console.log(error)
          this.loading = false;
        });
  }
}