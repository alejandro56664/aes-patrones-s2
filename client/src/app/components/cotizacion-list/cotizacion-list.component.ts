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
  public idUsuario;
  @HostBinding('class') classes = "row"
  cotizacions: any = [];
  cotizacion : any ={
    id_usuario: '',
    id_producto: '',
    estado: ''
  };
  constructor(private cotizacionsService: CotizacionService, private router : Router, private activatedRoute : ActivatedRoute) {
    this.idUsuario = localStorage.getItem('idUsuario')? JSON.parse(localStorage.getItem('idUsuario')) : '';

   }

  ngOnInit(): void {
    const params =this.activatedRoute.snapshot.params
    if(params.id_producto){
      console.log("Entro al constructor para guardar cotizaciones" + params.id_producto + params.id_usuario  )
      this.saveNewCotizacion(params.id_producto , this.idUsuario)
        }
        console.log("Salio al componente listar cotizaciones")
        this.getCotizacionesByUser(this.idUsuario);

      
    }
  
 
  getCotizaciones(){ 
    this.cotizacionsService.getCotizacions().subscribe(
      res => {
        

        this.cotizacions = res;
        JSON.parse(this.cotizacions);
        console.log("Entro a getCotizaciones")

      },
      err => console.error(err)

    )
  }
  getCotizacionesByUser(id_usuario){ 
    this.cotizacionsService.getCotizacionbyUser(id_usuario).subscribe(
      res => {
        
       this.cotizacions = res;
        console.log("Entro a getCotizacionesByUser"+ res)

      },
      err => console.error(err)

    )
  }
  deleteCotizacion(id: string){
    this.cotizacionsService.deleteCotizacion(id).subscribe(
      res => {
        console.log(res)
        this.getCotizacionesByUser(this.idUsuario);
      },
      err=>console.log(err)
    )
  }
  saveNewCotizacion(id_producto, id_usuario){

    this.cotizacion.id_producto=id_producto;
    this.cotizacion.id_usuario=id_usuario;
    this.cotizacion.estado="Pendiente";
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
