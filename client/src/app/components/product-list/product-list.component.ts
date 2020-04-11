import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductsService} from '../../services/products.service'
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authenticate.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @HostBinding('class') classes = "row"
  products: any = [];
  user: any = {
    id: 1,
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
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private productsService: ProductsService, private autheticationService : AuthenticationService) { 
console.log("Constructor Producto"+     this.autheticationService.currentUserValue.id_tipo_usuario)
    this.autheticationService.currentUserValue;
  }

  ngOnInit(): void {
   this.getProducts()
  }
  getProducts(){
    this.productsService.getProducts().subscribe(
      res => {
        this.products = res;

      },
      err => console.error(err)

    )
  }
  deleteProduct(id: string){
    this.productsService.deleteProduct(id).subscribe(
      res => {
        console.log(res)
        this.getProducts();
      },
      err=>console.log(err)
    )
  } 
  


}
