import { Component, OnInit, HostBinding } from '@angular/core';
import { CotizacionService} from '../../services/cotizacion.service'
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cotizacion-list',
  templateUrl: './cotizacion-list.component.html',
  styleUrls: ['./cotizacion-list.component.css']
})
export class CotizacionListComponent implements OnInit {
  @HostBinding('class') classes = "row"
  cotizacions: any = [];
  user : any ={
    id:  ''
  };
  constructor(private cotizacionsService: CotizacionService, private router : Router) { }

  ngOnInit(): void {
   this.getProducts()
  }
  getProducts(){
    this.cotizacionsService.getCotizacions().subscribe(
      res => {
        this.cotizacions = res;

      },
      err => console.error(err)

    )
  }
  deleteProduct(id: string){
    this.cotizacionsService.deleteCotizacion(id).subscribe(
      res => {
        console.log(res)
        this.getProducts();
      },
      err=>console.log(err)
    )
  }
  saveNewCotizacion(id_producto,id_usuario){
    this.cotizacionsService.saveCotizacion(id_producto,id_usuario)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/products']);
      },
      err => console.error(err)
    )
    
  }
  


}
