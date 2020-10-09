import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AgenciaMedicamentoService {

  private URL: string = "https://cima.aemps.es/cima/rest/medicamentos";
  

  constructor(private http: HTTP) { }

  buscarMedicacion(nameCommercial: string, drug: string, pagina: number)  {
    console.log("AgenciaMedicamentoService.buscarMedicacion");
    return this.http.get(this.URL, { nombre: nameCommercial, practiv1: drug, pagina: pagina.toString() }, {});
  }

  buscarCodigoBarras(cn:number) {

  }
  
}
