import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { HttpClientModule} from '@angular/common/http'
import { Cotizacion } from '../models/Cotizacion';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  API_URI='http://localhost:3006/api'

  constructor(private http:HttpClient){

   }
   getCotizacions(){
     return this.http.get(this.API_URI+'/cotizaciones')
   }
   getCotizacion(id: string){
    return this.http.get(this.API_URI+'/cotizaciones/'+id)
  }
  saveCotizacion(cotizacion: Cotizacion){ 
    return this.http.post(this.API_URI+'/cotizaciones/add', cotizacion)
  }
  deleteCotizacion(id: string){
    return this.http.delete(this.API_URI+'/cotizaciones/'+id)
  }
  updateCotizacion(id: string| number, updateCotizacion: Cotizacion): Observable<any>{
    console.log ("este es el id"+id);
    return this.http.put(this.API_URI+'/cotizaciones/'+id, updateCotizacion)
  }
}

