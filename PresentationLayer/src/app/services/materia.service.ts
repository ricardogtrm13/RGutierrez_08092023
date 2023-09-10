import { Injectable } from '@angular/core';
//Importamos librerias necesarias para que funcione la App
import { HttpClient } from '@angular/common/http'; //Cliente de los servicios
// import { environment } from 'src/environments/environment'; //Accede a las propiedades de navegacion
import { Observable } from 'rxjs';
import { Materia } from '../interfaces/materia'; //Interfaz que contiene el modelo


@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private endPoint: string = "http://localhost:13427/"; //Obtenemos la base de la url
  private apiURL: string = this.endPoint + "api/materia/"; //Concatenamos el controlador
  
  constructor(private http: HttpClient) { } //Creamos el objeto cliente para hacer solicitudes

  getList(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiURL}getall`);
  }

  add(modelo: Materia): Observable<Materia> {
    return this.http.post<Materia>(`${this.apiURL}add`,modelo);
  }

  delete(idMateria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}delete/${idMateria}`);
  }

  update(modelo: Materia): Observable<Materia> {
    return this.http.put<Materia>(`${this.apiURL}update`,modelo);
  }
}
