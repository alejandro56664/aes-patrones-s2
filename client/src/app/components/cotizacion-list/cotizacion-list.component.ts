import { Component, OnInit, HostBinding } from '@angular/core';
import { CotizacionService} from '../../services/cotizacion.service'
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cotizacion-list',
  templateUrl: './cotizacion-list.component.html',
  styleUrls: ['./cotizacion-list.component.css']
})
export class CotizacionListComponent implements OnInit {
  @HostBinding('class') classes = "row"
  cotizacions: any = [];
  cotizacion : any ={
    id_usuario: '',
    id_producto: ''
  };
  constructor(private cotizacionsService: CotizacionService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    const params =this.activatedRoute.snapshot.params
    if(params.id_producto && params.id_usuario){
      console.log("Entro al componente listar cotizaciones" + params.id_producto + params.id_usuario  )
      this.saveNewCotizacion(params.id_producto , params.id_usuario)
        }
        console.log("Salio al componente listar cotizaciones")
    this.getCotizaciones();

      
    }
  
 
  getCotizaciones(){ 
    this.cotizacionsService.getCotizacions().subscribe(
      res => {
        console.log("Entro a getCotizaciones")

        this.cotizacions = res;

      },
      err => console.error(err)

    )
  }
  deleteCotizacion(id: string){
    this.cotizacionsService.deleteCotizacion(id).subscribe(
      res => {
        console.log(res)
        this.getCotizaciones();
      },
      err=>console.log(err)
    )
  }
  saveNewCotizacion(id_producto, id_usuario){

    this.cotizacion.id_producto=id_producto;
    this.cotizacion.id_usuario=id_usuario;
    console.log("Entro a guardar cotizacion"+id_producto, id_usuario, this.cotizacion)

    this.cotizacionsService.saveCotizacion(this.cotizacion)
    .subscribe( 
      res =>{
        console.log(res);
        this.router.navigate(['/cotizaciones/']);
      },
      err => console.error(err)
    )
    
  }
  


}
