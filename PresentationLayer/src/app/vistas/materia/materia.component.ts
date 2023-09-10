import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { Materia } from 'src/app/interfaces/materia';
import { MateriaService } from 'src/app/services/materia.service';

import {MatSnackBar} from '@angular/material/snack-bar';

import { FormMComponent } from './form-m/form-m.component'; 
import { AlertaDeleteMComponent } from './alerta-delete-m/alerta-delete-m.component';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements AfterViewInit, OnInit {
  //OnInit permite ejecutar una función al iniciar la aplicación
  displayedColumns: string[] = ['IdMateria', 'Nombre', 'Costo', 'Acciones'];
  dataSource = new MatTableDataSource<Materia>();

  constructor(private materiaService: MateriaService,
  public dialog: MatDialog,
  private snackBar: MatSnackBar
  ){
    
  }
  
  ngOnInit(): void { //Llama el metodo que consume la api
    this.materiaGetAll();
  }

@ViewChild(MatPaginator) paginator!: MatPaginator;


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

materiaGetAll(){
  this.materiaService.getList().subscribe({
    next:(dataResponse) => {
      console.log(dataResponse)
      this.dataSource.data = dataResponse;
    },error:(e) => {}
  })
}

openDialog() {
  this.dialog.open(FormMComponent,{
    disableClose:true,
    width:"350px",
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Creado"){
      this.materiaGetAll();
    }
  });
}

openDialogUpdate(dataMateria:Materia ) {
  this.dialog.open(FormMComponent,{
    disableClose:true,
    width:"350px",
    data:dataMateria
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Actualizado"){
      this.materiaGetAll();
    }
  });
}

setAlerta(message: string, action: string) {
  this.snackBar.open(message, action,{
    horizontalPosition:"end",
    verticalPosition: "top",
    duration: 3000
  });
}

dialogoEliminar(dataMateria:Materia){
  this.dialog.open(AlertaDeleteMComponent,{
    disableClose:true,
    data:dataMateria
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Eliminar"){
      this.materiaService.delete(dataMateria.idMateria).subscribe({
        next:(data) => {
          this.setAlerta("Materia eliminada", "Listo");
          this.materiaGetAll();
        },
        error:(e) => {}
      })
    }
  });
}

}

