import { Injectable } from '@angular/core';
//Importamos librerias necesarias para que funcione la App
import { HttpClient } from '@angular/common/http'; //Cliente de los servicios
// import { environment } from 'src/environments/environment'; //Accede a las propiedades de navegacion
import { Observable } from 'rxjs';
import { Alumno } from '../interfaces/alumno'; //Interfaz que contiene el modelo

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private endPoint: string = "http://localhost:13427/"; //Obtenemos la base de la url
  private apiURL: string = this.endPoint + "api/alumno/"; //Concatenamos el controlador
  
  constructor(private http: HttpClient) { } //Creamos el objeto cliente para hacer solicitudes

  getList(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiURL}getall`);
  }

  getByNombre(nombre: string): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiURL}getbynombre/${nombre}`);
  }

  add(modelo: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiURL}add`,modelo);
  }

  delete(idAlumno: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}delete/${idAlumno}`);
  }

  update(modelo: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiURL}update`,modelo);
  }
}
