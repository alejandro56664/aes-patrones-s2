import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { HttpClientModule} from '@angular/common/http'
import { User } from '../models/User';
import { Observable } from 'rxjs';  
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URI='http://localhost:3006/api'

  constructor(private http:HttpClient){

   }
   getUsers(){
     return this.http.get(this.API_URI+'/users')
   }
   getUser(id: string){
    return this.http.get(this.API_URI+'/users/'+id)
  }
  saveUser(user: User){
    return this.http.post(this.API_URI+'/users/', user)
  }
  deleteUser(id: string){
    return this.http.delete(this.API_URI+'/users/'+id)
  }
  updateUser(id: string| number, updateUser: User): Observable<any>{
    console.log ("este es el id"+id);
    return this.http.put(this.API_URI+'/users/'+id, updateUser)
  }

}
