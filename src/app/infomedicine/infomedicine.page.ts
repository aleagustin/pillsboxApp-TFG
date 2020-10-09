import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MedicacionService } from '../services/medicacion.service'
import { Usuario } from '../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicationUser } from '../models/medicationUser';





@Component({
  selector: 'app-infomedicine',
  templateUrl: './infomedicine.page.html',
  styleUrls: ['./infomedicine.page.scss'],
})


export class InfomedicinePage implements OnInit {
  medicineUserList: MedicationUser[];
  idMedicine: string;
  
  constructor(private authService:AuthService, private medicacionService:MedicacionService, private activatedRoute:ActivatedRoute) {
    
    this.idMedicine = this.activatedRoute.snapshot.paramMap.get('idmedicine');
    console.log("El id de la medicina: "  + this.idMedicine);

   }

  ngOnInit() {
    this.getMedicineId()
  }



  getMedicineId(){

    this.authService.getUser().subscribe( (usuario: Usuario) => {
      if(usuario) {
        this.medicacionService.findId(usuario.id.toString(),this.idMedicine).subscribe( ( medicineUserList: MedicationUser[]) => {
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






}
