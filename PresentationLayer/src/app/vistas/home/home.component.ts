import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'PresentationLayer';
  formAlumno: FormGroup;
  dataSource = new Array;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _alumnoServicio: AlumnoService,
    @Inject(Router) private router: Router,
  ) {
    this.formAlumno = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required]
    })
  }

  setAlerta(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  login() {
      console.log(this.formAlumno.value)
      const modelo: Alumno = {
        idAlumno: 0,
        nombre: this.formAlumno.value.nombre,
        apellidoPaterno: this.formAlumno.value.apellidoPaterno,
        apellidoMaterno: ""
      }
      this._alumnoServicio.getByNombre(modelo.nombre).subscribe({
        next: (dataResponse) => {
          console.log(dataResponse)
          this.dataSource = dataResponse;
        }, error: (e) => { }
      })
      if(this.dataSource[2] == modelo.apellidoPaterno){
        this.router.navigate(['/alumnomateria/' + modelo.idAlumno])
  }
}
}