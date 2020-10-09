import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HTTP } from '@ionic-native/http/ngx';
import { AgenciaMedicamentoService } from './services/agencia-medicamento.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { Push } from '@ionic-native/push/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    StatusBar,
    SplashScreen,
    HTTP,
    Push,
    InAppBrowser,
    BarcodeScanner,
    AgenciaMedicamentoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
