import { Injectable } from '@angular/core';
//Importamos librerias necesarias para que funcione la App
import { HttpClient } from '@angular/common/http'; //Cliente de los servicios
// import { environment } from 'src/environments/environment'; //Accede a las propiedades de navegacion
import { Observable } from 'rxjs';
import { AlumnoMateria } from '../interfaces/alumnomateria';
import { AlumnomateriaComponent } from '../vistas/alumnomateria/alumnomateria.component';

@Injectable({
  providedIn: 'root'
})
export class AlumnomateriaService {

  private endPoint: string = "http://localhost:13427/"; //Obtenemos la base de la url
  private apiURL: string = this.endPoint + "api/alumnomateria/"; //Concatenamos el controlador
  
  constructor(private http: HttpClient) { } //Creamos el objeto cliente para hacer solicitudes

  getList(): Observable<AlumnoMateria[]> {
    return this.http.get<AlumnoMateria[]>(`${this.apiURL}getall`);
  }

  getByIdAlumno(idAlumno: number): Observable<AlumnoMateria[]> {
    return this.http.get<AlumnoMateria[]>(`${this.apiURL}getmaterias/${idAlumno}`);
  }

  getNoListed(idAlumno: number): Observable<AlumnoMateria[]> {
    return this.http.get<AlumnoMateria[]>(`${this.apiURL}getmateriassinasignar//${idAlumno}`);
  }

  add(modelo: AlumnoMateria): Observable<AlumnoMateria> {
    return this.http.post<AlumnoMateria>(`${this.apiURL}add`,modelo);
  }

  delete(idAlumno: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}delete/${idAlumno}`);
  }
}
