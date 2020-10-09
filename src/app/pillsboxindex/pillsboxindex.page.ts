import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PillsboxService } from '../services/pillsbox.service';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario';
import { PillsBox } from '../models/pillsbox';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-pillsboxindex',
  templateUrl: './pillsboxindex.page.html',
  styleUrls: ['./pillsboxindex.page.scss'],
})
export class PillsboxindexPage implements OnInit {

  public pillBoxList: PillsBox[] = [];
  nombrePillsbox: any;

  constructor(private authService: AuthService, private pillsboxService:PillsboxService ,private router:Router,private alert:AlertController) { }

  ngOnInit() {
    this.getPillsbox();
  }

  getPillsbox() {
    this.authService.getUser().subscribe( (usuario: Usuario) => {
      if(usuario) {
        this.pillsboxService.find(usuario.id.toString()).subscribe( ( pillBoxList: PillsBox[]) => {
          console.log("Pillsbox: ", pillBoxList);
          this.pillBoxList = pillBoxList;
        }, (err) => console.log(err));
      }
    })
  }



   


  goPillsBoxContent(id: number){

    this.router.navigate(['pillsboxcontent', id]);

  }

  delete(pillsBox: PillsBox) {
    console.log("delete", pillsBox);
    this.authService.getUser().subscribe((usuario: Usuario) => {
      if (usuario) {
        this.pillsboxService.delete(usuario.id, pillsBox).subscribe((reponse: any) => {
          this.getPillsbox();
          // Cerrar loading
        },
          (httpErrorResponse: HttpErrorResponse) => {
            console.log(httpErrorResponse);
            alert(httpErrorResponse.error.message);
          })
      }
    });
  }




    async savePillsBox() {
      const alert = await this.alert.create({
        header: 'Nuevo PillsBox',
        inputs: [
          {
            name: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del pillsbox'
          },
       
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Guardar',
            handler: (data:any) => {
              this.nombrePillsbox=data.Nombre;
              this.authService.getUser().subscribe( (usuario: Usuario) =>{
                this.pillsboxService.create(usuario.id, new PillsBox(null, this.nombrePillsbox, usuario.id, new Date())).subscribe( (data: any)  => {
                  console.log(data.message);
                  this.getPillsbox();
                });
              }, (error) =>{
                console.log(error.message);
              });

              
              console.log('Confirm Ok');
              console.log("El nombre del pillsbox es: "  + this.nombrePillsbox)

            }
          }
        ]
      });
  
      await alert.present();
    }



    }
  




