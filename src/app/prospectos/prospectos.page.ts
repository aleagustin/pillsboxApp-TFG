import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Medication } from '../models/medication'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AgenciaMedicamentoService } from '../services/agencia-medicamento.service';

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.page.html',
  styleUrls: ['./prospectos.page.scss'],
})
export class ProspectosPage implements OnInit {

  nameCommercial:string = "";
  drug:string = "";
  listMedication: Medication [] = [];
  etiqueta: string;
  pagina: number = 1;


  constructor(private agenciaMedicamentoServic:AgenciaMedicamentoService, private http:HTTP,private loading:LoadingController, private router:Router,private iab: InAppBrowser,private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  cargarSiguientePagina(event:any) {
    event.preventDefault();
    console.log('Cargar siguiente página');
    this.pagina++;
    
      this.agenciaMedicamentoServic.buscarMedicacion(this.nameCommercial, this.drug, this.pagina).then(data => {
        console.log("cargarSiguientePagina", data);
        if(!this.cargarMedicamentos(JSON.parse(data.data))) {
          event.target.disabled = true;
        }
      })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });

    event.target.complete();
  }

  searchMedication() {

    console.log("Conectando con la API");
    this.listMedication = [];
    
    this.loading.create({
      message: "Cargando...",
      duration: 10000,
      spinner: "circles"
    }).then(load => {
      load.present();

      this.agenciaMedicamentoServic.buscarMedicacion(this.nameCommercial, this.drug, this.pagina).then(data => {
        this.cargarMedicamentos(JSON.parse(data.data));
        this.loading.dismiss();

      })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          load.dismiss()

        });

    })

  }

  cargarMedicamentos(dataJson) {
       
    let listAux: any [];

    listAux = dataJson.resultados;
    //let listMedicationAux: Medication [] = []
    for (let index = 0; index < listAux.length; index++) {
      let nameAux = listAux[index].nombre
      let numberRegisterAux = listAux[index].nregistro
      let namelaboratoryAux = listAux[index].labtitular
      let namedrugAux = listAux[index].vtm.nombre
      let listprospectAux: any [] = listAux[index].docs
      let prospectAux = listprospectAux[0].urlHtml

      let medication: Medication = new Medication(numberRegisterAux,nameAux,namedrugAux,namelaboratoryAux,prospectAux);

     
      this.listMedication.push(medication);
      
    }
    // this.listMedication = listMedicationAux

    // console.log("Array AUX" + listMedicationAux.length)
    console.log("Array original" + this.listMedication.length);

    if(listAux.length<=0) return false;
    return true;

  }


  openLink(link){
    this.iab.create(link,"_blank");
  }





 /* goProspect(urlProspect){

    this.router.navigate(['prospecto'], {
      queryParams: {
        urlProspect: urlProspect
      }
    });

  }*/

scan(){
  this.barcodeScanner.scan().then(barcodeData => {
  //  console.log('Barcode data', barcodeData);
    

  let auxCode1 = barcodeData.text

  let auxcode2 = auxCode1.substr(6,auxCode1.length)

  let code = auxcode2.substr(0,auxcode2.length-1)



 // alert(code)

    let url = 'https://cima.aemps.es/cima/rest/medicamentos?cn=' + code
    //this.etiqueta = this.barcodeData.text
 
    console.log("Conectando con la API");
    this.loading.create({
      message: "Cargando...",
      duration: 10000,
      spinner: "circles"
    }).then(load => {
      load.present()
 
 
      this.http.get(url, {}, {}).then(data => {
 
       
        let dataJson = JSON.parse(data.data);
 
       
        let listAux: any []
 
        listAux = dataJson.resultados
        let listMedicationAux: Medication [] = []
 
        for (let index = 0; index < listAux.length; index++) {
          let nameAux = listAux[index].nombre
          let numberRegisterAux = listAux[index].nregistro
          let namelaboratoryAux = listAux[index].labtitular
          let namedrugAux = listAux[index].vtm.nombre
          let listprospectAux: any [] = listAux[index].docs
          let prospectAux = listprospectAux[0].urlHtml
 
          let medication: Medication = new Medication(numberRegisterAux,nameAux,namedrugAux,namelaboratoryAux,prospectAux);
 
         
          listMedicationAux.push(medication);
          
        }
        this.listMedication = listMedicationAux
 
        console.log("Array AUX" + listMedicationAux.length)
        console.log("Array original" + this.listMedication.length)
 
        this.loading.dismiss()
 
      })
        .catch(error => {
 
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          load.dismiss()
 
        });
 
    })



   }).catch(err => {
       console.log('Error', err);
   });


  



}

}
