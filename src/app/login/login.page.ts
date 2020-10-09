import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  
  public verifyAccess: boolean = false;
  public errorMessage: string = null;
  public correo:string;
  public contrasena:string;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {

  }




  login() {
    this.authService.login(this.correo, this.contrasena).subscribe( 
      (data : any) => {  
        // Función flecha que recibe la información.
      console.log("usuario", data);
      this.router.navigate(['home'], {});

    }, 
    (err: any) => {
       console.log(err);   // Observable emite un error.
       this.errorMessage = err.error.message;
       alert(this.errorMessage);

    });
  }




  goRegister(){
    
    this.router.navigate(['register'], {
     
    });
  }
}
