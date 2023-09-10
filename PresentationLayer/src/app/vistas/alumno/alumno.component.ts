import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import {Alumno} from 'src/app/interfaces/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

import {MatSnackBar} from '@angular/material/snack-bar';

import {FormComponent} from './form/form.component';
import {AlertaDeleteComponent} from './alerta-delete/alerta-delete.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements AfterViewInit, OnInit {
  //OnInit permite ejecutar una función al iniciar la aplicación
  displayedColumns: string[] = ['IdAlumno', 'Nombre', 'ApellidoPaterno', 'ApellidoMaterno','Acciones'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(private alumnoService: AlumnoService,
  public dialog: MatDialog,
  private snackBar: MatSnackBar
  ){
    
  }
  
  ngOnInit(): void { //Llama el metodo que consume la api
    this.alumnoGetAll();
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

alumnoGetAll(){
  this.alumnoService.getList().subscribe({
    next:(dataResponse) => {
      console.log(dataResponse)
      this.dataSource.data = dataResponse;
    },error:(e) => {}
  })
}

openDialog() {
  this.dialog.open(FormComponent,{
    disableClose:true,
    width:"350px",
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Creado"){
      this.alumnoGetAll();
    }
  });
}

openDialogUpdate(dataAlumno:Alumno ) {
  this.dialog.open(FormComponent,{
    disableClose:true,
    width:"350px",
    data:dataAlumno
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Actualizado"){
      this.alumnoGetAll();
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

dialogoEliminar(dataAlumno:Alumno){
  this.dialog.open(AlertaDeleteComponent,{
    disableClose:true,
    data:dataAlumno
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Eliminar"){
      this.alumnoService.delete(dataAlumno.idAlumno).subscribe({
        next:(data) => {
          this.setAlerta("Alumno eliminado", "Listo");
          this.alumnoGetAll();
        },
        error:(e) => {}
      })
    }
  });
}

}
