import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from '../../services/products.service'
import {  ActivatedRoute , Router } from '@angular/router'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [NgbModule], // add NgbDropdownConfig to the component providers
})

export class ProductFormComponent implements OnInit {
  product: any = {
    id: 0,
    title: '',
    description: '',
    image: '', 
    created_at: new Date()
  } 
  ;
  active=1;


  edit : boolean = false;

  constructor( private productsService:ProductsService, private router: Router, private activatedRoute : ActivatedRoute ) { 

    
  }

  ngOnInit(): void {
    const params =this.activatedRoute.snapshot.params
    
    
    if(params.id){
      this.productsService.getProduct(params.id).subscribe(
        res=>{
          console.log(res);
          this.product=res[0];
          console.log("parametro id"+ this.product);
        
          this.edit= true;
        },
        err=> console.error(err)

      )
    }
  }
  saveNewProduct(){
    delete this.product.created_at
    delete this.product.id
    this.productsService.saveProduct(this.product)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/cotizaciones']);
      },
      err => console.error(err)
    )
    
  }
  updateProduct(){
    delete this.product.created_at
    console.log("Entro a la modificacion"+this.product.created_at);

    this.productsService.updateProduct(this.product.id, this.product).subscribe(

      res=>{
        console.log(res)
        this.router.navigate(['/cotizaciones'])

      },
      err=>console.error(err)
    )
  }

}
