import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MedicationUser } from 'src/app/models/medicationUser';
import { AuthService } from '../../../services/auth.service';
import { MedicacionService } from '../../../services/medicacion.service'
import { Usuario } from '../../../models/usuario';
import { Posologia } from 'src/app/models/posologia';


@Component({
  selector: 'app-guardar-medicacion',
  templateUrl: './guardar-medicacion.component.html',
  styleUrls: ['./guardar-medicacion.component.scss'],
})
export class GuardarMedicacionComponent implements OnInit {

  @Input("pillsboxId") public pillsboxId: any;
  public nombreComercial: string;
  public principioActivo:string;
  public fechaInicio: Date;
  public fechaFin: Date;
  public numDias:number;

  public selectHora: string;
  public minutos: Date;
  public lunes: boolean;
  public martes: boolean;
  public miercoles: boolean;
  public jueves: boolean;
  public viernes: boolean;
  public sabado: boolean;
  public domingo: boolean;


  public tomas: Posologia []; 

  

  constructor(public modalController: ModalController,private authService: AuthService,private medicacionService:MedicacionService) {
    this.nombreComercial = '';
    this.principioActivo = '';
    this.fechaInicio = new Date();
    this.numDias = 0;
    this.tomas = [];

    this.lunes = false;
    this.martes = false;
    this.miercoles = false;
    this.jueves = false;
    this.viernes = false;
    this.sabado = false;
    this.domingo = false;
  }

  ngOnInit() {    
  }

  guardar() {
    console.log("GuardarMedicacionComponent.nombreComercial", this.nombreComercial);
    console.log("GuardarMedicacionComponent.principioActivo", this.principioActivo);
   
    this.authService.getUser().subscribe( (usuario: Usuario) =>{
      this.medicacionService.create(usuario.id, new MedicationUser(null, this.pillsboxId, this.nombreComercial, this.principioActivo,this.fechaInicio,this.fechaFin, null, null, this.tomas)).subscribe( (data: any)  => {
        console.log(data.message);
       //Aca No necesitaria llamar a la función de listar las medicaciones porque estan en la vista que no es modal
        console.log("DATA del POST", data);

        this.modalController.dismiss();
      });
    }, (error) =>{
      console.log(error.message);
    });
    
  }


  //Esto es por que algunas veces me lo devolvia 12:00 y otras veces como la hora completa que es lo que necesita mi base de datos
  addToma() {
    console.log("hora", this.selectHora);
    let _h: number = 0;
    let _m: number = 0;
    let _fecha = null;
    if(this.selectHora.length>5) {
      _fecha = new Date(this.selectHora);
    }
    if(_fecha == null) {
      let _h: number = parseInt(this.selectHora.toString().split(":")[0]);
      let _m: number = parseInt(this.selectHora.toString().split(":")[1]);
    } else {
      _h = _fecha.getHours();
      _m = _fecha.getMinutes();
    }
    
    
    if(!this.lunes && !this.martes && !this.miercoles && !this.jueves && !this.viernes && !this.sabado && !this.domingo) {
      alert("Debe seleccionar al menos un día");
      return;
    } else {    
      let posologia: Posologia = new Posologia(null, null, _h, _m,
        this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado, this.domingo );
        this.tomas.push(posologia);
      this.limpiarPosologiaForm();
    }
  }

  limpiarPosologiaForm() {
    this.lunes = false;
    this.martes = false;
    this.miercoles = false;
    this.jueves = false;
    this.viernes = false;
    this.sabado = false;
    this.domingo = false;
  }

  getDiasSemanas(posologia: Posologia): string {
    let diasSemana = "";
    if(posologia.lunes) diasSemana +="L ";
    if(posologia.martes) diasSemana +="M ";
    if(posologia.miercoles) diasSemana +="X ";
    if(posologia.jueves) diasSemana +="J ";
    if(posologia.viernes) diasSemana +="V ";
    if(posologia.sabado) diasSemana +="S ";
    if(posologia.domingo) diasSemana +="D ";
    return diasSemana;
  }

}

