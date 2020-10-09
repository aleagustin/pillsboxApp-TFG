import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URI: String = "https://pillsbox.herokuapp.com";

  constructor(private http: HttpClient) { }

  public registrarToken(idUser: number, token:string) {
    console.log('UsuarioService.registrarToken', idUser);

    let body = {
      token: token
    }

    return this.http.post(`${this.API_URI}/user/${idUser}/pushtoken/`, body);
  }


  public create(usuario: Usuario) {
    console.log('UsuarioService.create', usuario);
    return this.http.post(`${this.API_URI}/user`, usuario);
  }
}
