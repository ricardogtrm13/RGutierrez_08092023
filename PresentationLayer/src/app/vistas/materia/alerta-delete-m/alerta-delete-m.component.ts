import { Component, Inject, OnInit, inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Materia } from 'src/app/interfaces/materia';

@Component({
  selector: 'app-alerta-delete-m',
  templateUrl: './alerta-delete-m.component.html',
  styleUrls: ['./alerta-delete-m.component.css']
})
export class AlertaDeleteMComponent {

  constructor(
    private dialogoReferencia: MatDialogRef<AlertaDeleteMComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMateria: Materia
  ){
    
  }

  confirmacionDelete(){
    if(this.dataMateria){
      this.dialogoReferencia.close("Eliminar")
    }
  }
}
