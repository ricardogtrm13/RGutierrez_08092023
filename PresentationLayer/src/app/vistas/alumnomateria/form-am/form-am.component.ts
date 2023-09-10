import { Component, Inject, OnInit, inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';

import { AlumnoMateria } from 'src/app/interfaces/alumnomateria';
import {AlumnomateriaService} from 'src/app/services/alumnomateria.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-form-am',
  templateUrl: './form-am.component.html',
  styleUrls: ['./form-am.component.css']
})
export class FormAMComponent implements OnInit {
  //OnInit permite ejecutar una función al iniciar la aplicación
  displayedColumns: string[] = ['IdMateria', 'Nombre', 'Costo', 'Acciones'];
  dataSource = new MatTableDataSource<AlumnoMateria>();
  formAlumnoMateria: FormGroup;
  tituloAccion: string = "Asignar";
  botonAccion: string =  "Asignar";


  constructor(
    private dialogoReferencia: MatDialogRef<FormAMComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _alumnoMateriaService: AlumnomateriaService,
    public dialog: MatDialog,
    private value: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public dataAlumnoMateria: AlumnoMateria
  ){
    this.formAlumnoMateria = this.fb.group({
      idAlumno: [0],
      idMateria:['',Validators.required]
    })

  }

  valor: number = 0;

  materiasGetByIdAlumno() {
    this.value.params.subscribe(params =>{
      this.valor = params['id']
    })
    this._alumnoMateriaService.getNoListed(this.valor).subscribe({
      next: (dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      }, error: (e) => { }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setAlerta(message: string, action: string) {
    this.snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  alumnoMateriaAdd(){
    console.log(this.formAlumnoMateria.value)
    const modelo: AlumnoMateria = {
      idAlumnoMateria: 0,
      idAlumno: this.formAlumnoMateria.value.idAlumno,
      idMateria: this.formAlumnoMateria.value.idMateria,
      nombre: '',
      costo: 0
    }
      this._alumnoMateriaService.add(modelo).subscribe({
        next:(data)=>{
          this.setAlerta("Materia asignada con exito", "Listo");
          this.dialogoReferencia.close("Creado");
        },error:(e)=>{
          this.setAlerta("No se pudo asignar el alumno", "Error");
        }
      })

  }

  ngOnInit(): void {
    if(this.dataAlumnoMateria){
      this.formAlumnoMateria.patchValue({
        idAlumnoMateria: this.dataAlumnoMateria.idAlumnoMateria,
        idAlumno: this.dataAlumnoMateria.idAlumno,
        idMateria: this.dataAlumnoMateria.idMateria
      })
      this.tituloAccion = "Actualizar";
      this.botonAccion = "Actualizar";
    }
  }
}

