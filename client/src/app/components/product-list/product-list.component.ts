import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductsService} from '../../services/products.service'
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @HostBinding('class') classes = "row"
  products: any = [];
  user : any ={
    id:  ''
  };
  constructor(private productsService: ProductsService) { }

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
