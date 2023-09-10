import { Component, Inject, OnInit, inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Materia } from 'src/app/interfaces/materia'; 
import { MateriaService } from 'src/app/services/materia.service'; 

@Component({
  selector: 'app-form-m',
  templateUrl: './form-m.component.html',
  styleUrls: ['./form-m.component.css']
})
export class FormMComponent implements OnInit{
  formMateria: FormGroup;
  tituloAccion: string = "Registrar";
  botonAccion: string =  "Guardar";


  constructor(
    private dialogoReferencia: MatDialogRef<FormMComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _materiaService: MateriaService,
    @Inject(MAT_DIALOG_DATA) public dataMateria: Materia
  ){
    this.formMateria = this.fb.group({
      idMateria: [0],
      nombre:['',Validators.required],
      costo:['',Validators.required]
    })

    
  }

  setAlerta(message: string, action: string) {
    this.snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  materiaAddEdit(){
    console.log(this.formMateria.value)
    const modelo:Materia = {
      idMateria: this.formMateria.value.idAlumno,
      nombre: this.formMateria.value.nombre,
      costo: this.formMateria.value.costo
    }

    if(this.dataMateria == null){
      this._materiaService.add(modelo).subscribe({
        next:(data)=>{
          this.setAlerta("Materia registrada con exito", "Listo");
          this.dialogoReferencia.close("Creado");
        },error:(e)=>{
          this.setAlerta("No se pudo registrar la materia", "Error");
        }
      })
    }
    else{
      this._materiaService.update(modelo).subscribe({
        next:(data)=>{
          this.setAlerta("Materia modificada con exito", "Listo");
          this.dialogoReferencia.close("Actualizado");
        },error:(e)=>{
          this.setAlerta("No se pudo modificar la información", "Error");
        }
      })
    }

  }

  ngOnInit(): void {
    if(this.dataMateria){
      this.formMateria.patchValue({
        idMateria: this.dataMateria.idMateria,
        nombre: this.dataMateria.nombre,
        costo: this.dataMateria.costo
      })
      this.tituloAccion = "Actualizar";
      this.botonAccion = "Actualizar";
    }
  }
}

