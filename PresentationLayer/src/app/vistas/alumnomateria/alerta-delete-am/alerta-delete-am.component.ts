import { Component, Inject, OnInit, inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlumnoMateria } from 'src/app/interfaces/alumnomateria';

@Component({
  selector: 'app-alerta-delete-am',
  templateUrl: './alerta-delete-am.component.html',
  styleUrls: ['./alerta-delete-am.component.css']
})
export class AlertaDeleteAMComponent {

   
  constructor(
    private dialogoReferencia: MatDialogRef<AlertaDeleteAMComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAlumnoMateria: AlumnoMateria
  ){
    
  }

  confirmacionDelete(){
    if(this.dataAlumnoMateria){
      this.dialogoReferencia.close("Eliminar")
    }
  }

}
