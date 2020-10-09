import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MedicationUser } from '../models/medicationUser';



@Injectable({
  providedIn: 'root'
})
export class MedicacionService {

  private API_URI: String = "https://pillsbox.herokuapp.com";

  constructor(private http: HttpClient) { }



  //creo una medicacion
  public create(idUser: number, medicationUser: MedicationUser) {
    console.log('MedicationService.find', idUser);
    return this.http.post(`${this.API_URI}/user/${idUser}/medicine/`, medicationUser);
  }

  //listo las medicaciones que contiene el pillsbox
  public find(idUser: string, idPillsBox: string): Observable<MedicationUser[]> {
    console.log('PillsboxService.find', idUser);
    return this.http.get<any[]>(`${this.API_URI}/user/${idUser}/pillsbox/${idPillsBox}/medicine`).pipe(
      map( response => response.map( data => new MedicationUser(data.id, data.pillsboxId, data.nombreComercial, data.principioActivo, data.fechaInicio, data.fechaFin, data.ultimaToma, data.proxNotificacion)))
    );
  }

  //Busco por id
  public findId(idUser: string, id: string): Observable<MedicationUser[]> {
    console.log('PillsboxService.find', idUser, id);
    return this.http.get<any[]>(`${this.API_URI}/user/${idUser}/medicine/${id}`).pipe(
      map( response => response.map( data => new MedicationUser(data.id, data.pillsboxId, data.nombreComercial, data.principioActivo, data.fechaInicio, data.fechaFin, data.ultimaToma, data.proxNotificacion)))
    );
  }

  public delete(idUser: number, medicationUser: MedicationUser) {
    console.log('MedicationService.find', idUser);
    return this.http.delete(`${this.API_URI}/user/${idUser}/medicine/${medicationUser.id}`);
  }
  
}




