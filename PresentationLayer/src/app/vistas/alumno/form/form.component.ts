import { Component, Inject, OnInit, inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Alumno } from 'src/app/interfaces/alumno';
import {AlumnoService} from 'src/app/services/alumno.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  formAlumno: FormGroup;
  tituloAccion: string = "Registrar";
  botonAccion: string =  "Guardar";


  constructor(
    private dialogoReferencia: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _alumnoServicio: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public dataAlumno: Alumno
  ){
    this.formAlumno = this.fb.group({
      idAlumno: [0],
      nombre:['',Validators.required],
      apellidoPaterno:['',Validators.required],
      apellidoMaterno:['',Validators.required]
    })

    
  }

  setAlerta(message: string, action: string) {
    this.snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  alumnoAddEdit(){
    console.log(this.formAlumno.value)
    const modelo:Alumno = {
      idAlumno: this.formAlumno.value.idAlumno,
      nombre: this.formAlumno.value.nombre,
      apellidoPaterno: this.formAlumno.value.apellidoPaterno,
      apellidoMaterno: this.formAlumno.value.apellidoMaterno
    }

    if(this.dataAlumno == null){
      this._alumnoServicio.add(modelo).subscribe({
        next:(data)=>{
          this.setAlerta("Alumno registrado con exito", "Listo");
          this.dialogoReferencia.close("Creado");
        },error:(e)=>{
          this.setAlerta("No se pudo registrar el alumno", "Error");
        }
      })
    }
    else{
      this._alumnoServicio.update(modelo).subscribe({
        next:(data)=>{
          this.setAlerta("Alumno modificado con exito", "Listo");
          this.dialogoReferencia.close("Actualizado");
        },error:(e)=>{
          this.setAlerta("No se pudo modificar la información", "Error");
        }
      })
    }

  }

  ngOnInit(): void {
    if(this.dataAlumno){
      this.formAlumno.patchValue({
        idAlumno: this.dataAlumno.idAlumno,
        nombre: this.dataAlumno.nombre,
        apellidoPaterno: this.dataAlumno.apellidoPaterno,
        apellidoMaterno: this.dataAlumno.apellidoMaterno
      })
      this.tituloAccion = "Actualizar";
      this.botonAccion = "Actualizar";
    }
  }
}

