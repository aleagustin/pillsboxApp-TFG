import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Siempre que entro a la aplicación todas las peticiones del httpclient pasan por el interceptor request y manejador 
    //Manejador continua con la petición y continua con la request


      // Obtener el usuario AuthService.
      // Si el usuario exite, obtenemos el token, añadimos el token a la cabecera de la request y continuamos con la petición.
      // Si NO exite usuairo, continuamos la petición (no hacemos nada)
      
      return this.authService.getUser().pipe(
        take(1), // cojo el primer valor del obsevable porque debe cojer un unico valor
        exhaustMap(user => {
          console.log("interceptor");

          // Comprueba si existe algún usuario que haya iniciado sesión.
          if (!user) {  //si el usuario no existe continua con la peticion por que el manejador se encarga de ello
            return next.handle(req); // Si no hay ningún usuario, continua con la request.
          }
  
          // Si el usuario ha iniciado sesión, se incluye la cabecera con el token.
          console.log("Interceptor token", user.accessToken); //  user.accessToken  tiene el token del usuario.
  
          const modifiedReq = req.clone({ //clono la req y le agrego a la cabecera el token
            setHeaders: {
              'x-access-token': user.accessToken
            }
          });
  
          return next.handle(modifiedReq).pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 401 || err.status === 403) {
                this.router.navigateByUrl('/login');
              }
              return throwError(err);
            })
          );
        }));
  }

}
