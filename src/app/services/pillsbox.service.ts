import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { PillsBox } from '../models/pillsbox';

@Injectable({
  providedIn: 'root'
})
export class PillsboxService {

  private API_URI: String = "https://pillsbox.herokuapp.com";

  constructor(private http: HttpClient) { }

  public find(idUser: string): Observable<PillsBox[]> {
    console.log('PillsboxService.find', idUser);
    return this.http.get<any[]>(`${this.API_URI}/user/${idUser}/pillsbox/`).pipe(
      map( response => response.map( data => new PillsBox(data.id, data.nombre, data.fechaCreacion)))
    );
  }

 public create(idUser: number, pillsBox:PillsBox) {
    console.log('PillsboxService.find', idUser);
    return this.http.post(`${this.API_URI}/user/${idUser}/pillsbox/`, pillsBox);
  }

  public delete(idUser: number, pillsBox:PillsBox) {
    console.log('MedicationService.find', idUser);
    return this.http.delete(`${this.API_URI}/user/${idUser}/pillsbox/${pillsBox.id}`);
  }


}