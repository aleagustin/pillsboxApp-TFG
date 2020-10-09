import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public nombre: string;
  public apellido: string;
  public email: string;
  public contrasena: string;
  public contrasena2: string;
  public fechaNacimiento: Date;
  public errMessage:String = null;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if(!form.valid) {
      return;
    }

    if(this.contrasena != this.contrasena2) {
      alert("La contraseña no coincide");
    }

    let usuario: Usuario = new Usuario(null, this.email, this.contrasena, this.nombre, this.apellido, this.fechaNacimiento, null, null);
    console.log("register", usuario);

    this.usuarioService.create(usuario).subscribe( ( reponse: any) => {
      console.log(reponse);
      this.router.navigate(['login']);
    }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        alert(httpErrorResponse.error.message);
    })

  }

}
