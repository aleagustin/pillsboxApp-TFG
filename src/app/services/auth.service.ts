import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { BehaviorSubject } from 'rxjs';
import { tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URI: String = "https://pillsbox.herokuapp.com";

  // Es un obsevable que le da el mismo valor a todos sus subscriptores
  private usuarioSubject: BehaviorSubject<Usuario>;

  constructor(private http: HttpClient) { 
    this.usuarioSubject = new BehaviorSubject<Usuario>(null);
  }

  public login(email:string, clave:string) {

    let data = {
      'email': email,
      'contrasena': clave
    };

/******Tuberias*****/
// Aqui intercepto el valor y en 
    return this.http.post<any>(`${this.API_URI}/login`, data).pipe( 
      tap( (reponse: any []) => {
        if(reponse.length > 0) {
          let data = reponse[0];
          let usuario: Usuario = new Usuario(data.id, data.email, data.contrasena, data.nombre, data.apellido, data.fechaNacimiento, data.notificaciones, data.accessToken);
          this.usuarioSubject.next(usuario); // NEXT Emite un nuevo valor con el usuario que se ha logado en la aplicación.
        }
      })
    );
  }


  public getUser(): Observable<Usuario> {
    return this.usuarioSubject.asObservable(); //
  }
}
