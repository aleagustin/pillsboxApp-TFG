import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'PillsBox',
      url: 'pillsboxindex',
      icon:''
      
    },
    {
      title: 'Prospectos',
      url: 'prospectos',
      icon: 'newspaper'
    },
    {
      title: 'Ajustes',
      url: 'settings',
      icon: 'cog'
    }

  ];
 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private push: Push,
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.getUser().subscribe( (usuario: Usuario) => {
        if(usuario != null) {
          this.getUserToken(usuario);
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  private getUserToken(usuario: Usuario) {
    console.log("getUserToken");
    /*this.platform.ready().then(() => {*/

      const options: PushOptions = {
        android: {
          // Añadimos el sender ID para Android.
          senderID: '407840734801'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration').subscribe( (registration: any) => {
        console.log('Device registered', registration);
        const { registrationId } = registration;
        this.usuarioService.registrarToken(usuario.id, registrationId).subscribe( () => {
          console.log("Token registrado");
        }, (err) => {
          console.log("getUserToken", err);
        })
      })

      pushObject.on('notification').subscribe( async (notification: any) => {
        console.log("Notificación recibida", notification);
        const alert = await this.alertController.create({
          header: notification.title,
          message: notification.message,
        });

        await alert.present();
      });

    /*});*/
  }
  
}
