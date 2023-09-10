import { Component, Inject, OnInit, inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Alumno } from 'src/app/interfaces/alumno';

@Component({
  selector: 'app-alerta-delete',
  templateUrl: './alerta-delete.component.html',
  styleUrls: ['./alerta-delete.component.css']
})
export class AlertaDeleteComponent {
  
  constructor(
    private dialogoReferencia: MatDialogRef<AlertaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAlumno: Alumno
  ){
    
  }

  confirmacionDelete(){
    if(this.dataAlumno){
      this.dialogoReferencia.close("Eliminar")
    }
  }
}
