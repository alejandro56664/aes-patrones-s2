import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { HttpClientModule} from '@angular/common/http'
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URI='http://localhost:3006/api'

  constructor(private http:HttpClient){

   }
   getProducts(){
     return this.http.get(this.API_URI+'/products')
   }
   getProduct(id: string){
    return this.http.get(this.API_URI+'/products/'+id)
  }
  saveProduct(product: Product){
    return this.http.post(this.API_URI+'/products/', product)
  }
  deleteProduct(id: string){
    return this.http.delete(this.API_URI+'/products/'+id)
  }
  updateProduct(id: string| number, updateProduct: Product): Observable<any>{
    console.log ("este es el id"+id);
    return this.http.put(this.API_URI+'/products/'+id, updateProduct)
  }
}

