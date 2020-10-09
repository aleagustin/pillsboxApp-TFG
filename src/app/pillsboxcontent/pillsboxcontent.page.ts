import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GuardarMedicacionComponent } from './components/guardar-medicacion/guardar-medicacion.component';
import { AuthService } from '../services/auth.service';
import { MedicacionService } from '../services/medicacion.service'
import { Usuario } from '../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicationUser } from '../models/medicationUser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pillsboxcontent',
  templateUrl: './pillsboxcontent.page.html',
  styleUrls: ['./pillsboxcontent.page.scss'],
})
export class PillsboxcontentPage implements OnInit {

  private id: any;
  public medicineUserList: MedicationUser[];

  constructor(private router: Router, public modalController: ModalController, private alert: AlertController, private authService: AuthService, private medicacionService: MedicacionService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("El id del pillsbox: " + this.id);
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getMedicine();
  }


  async addMedicationModal() {
    console.log("El id del pillsbox: " + this.id)
    const modal = await this.modalController.create({
      component: GuardarMedicacionComponent,
      componentProps: {
        pillsboxId: this.id
      }
    });

    modal.onDidDismiss().then(() => {
      console.log("Recargar listado de medicinas");
      // this.getMedicine();
    });

    await modal.present();
  }


  getMedicine() {
    
    // Crear loading

    this.authService.getUser().subscribe((usuario: Usuario) => {
      if (usuario) {
        this.medicacionService.find(usuario.id.toString(), this.id).subscribe((medicineUserList: MedicationUser[]) => {
          console.log("MedicationUser: ", medicineUserList);
          this.medicineUserList = medicineUserList;
          // Cerrar loading

        },
          (err) => {
            console.log(err);
            // Cerrar loading
          });
      }
    });

    // Presentar loading
  }

  delete(medicine: MedicationUser) {
    console.log("delete", medicine);
    this.authService.getUser().subscribe((usuario: Usuario) => {
      if (usuario) {
        this.medicacionService.delete(usuario.id, medicine).subscribe((reponse: any) => {
          this.getMedicine();
          // Cerrar loading
        },
          (httpErrorResponse: HttpErrorResponse) => {
            console.log(httpErrorResponse);
            alert(httpErrorResponse.error.message);
          })
      }
    });
  }


  goinfomedicine(idmedicine) {
    console.log("goinfomedicine", idmedicine);
    this.router.navigate(['infomedicine', idmedicine]);
  }







}
