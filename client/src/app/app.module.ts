import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesService} from './services/games.service';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CotizacionListComponent } from './components/cotizacion-list/cotizacion-list.component';
import { CotizacionFormComponent } from './components/cotizacion-form/cotizacion-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmationDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert-component/alert-component';
import { AlertService } from './services/alert.service';
import { CotizacionService } from './services/cotizacion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/erro.interceptor.service';
import { JwtInterceptor } from './helpers/jwtInterceptors/jwtinterceptors';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameFormComponent,
    GameListComponent,
    UserLoginComponent,
    UserLogoutComponent,
    ProductListComponent,
    ProductFormComponent,
    CotizacionListComponent,
    CotizacionFormComponent,
    UserFormComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    AlertComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    GamesService,
    UsersService,
    AlertService,
    CotizacionService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
