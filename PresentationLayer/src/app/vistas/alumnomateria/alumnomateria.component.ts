import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

import { AlumnoMateria } from 'src/app/interfaces/alumnomateria';
import { AlumnomateriaService } from 'src/app/services/alumnomateria.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormAMComponent } from '../alumnomateria/form-am/form-am.component';
import { AlertaDeleteAMComponent } from '../alumnomateria/alerta-delete-am/alerta-delete-am.component';

@Component({
  selector: 'app-alumnomateria',
  templateUrl: './alumnomateria.component.html',
  styleUrls: ['./alumnomateria.component.css']
})

export class AlumnomateriaComponent implements AfterViewInit, OnInit {
  //OnInit permite ejecutar una función al iniciar la aplicación
  displayedColumns: string[] = ['IdAlumnoMateria', 'IdMateria', 'Nombre', 'Costo', 'Acciones'];
  dataSource = new MatTableDataSource<AlumnoMateria>();

  constructor(
    private alumnoMateriaService: AlumnomateriaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private value: ActivatedRoute
    ) {

  }
  valor: number = 0;

  ngOnInit(): void { //Llama el metodo que consume la api
    this.materiasGetByIdAlumno();
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

  materiasGetByIdAlumno() {
    this.value.params.subscribe(params =>{
      this.valor = params['id']
    })
    this.alumnoMateriaService.getByIdAlumno(this.valor).subscribe({
      next: (dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      }, error: (e) => { }
    })
  }

  openDialog() {
    this.dialog.open(FormAMComponent, {
      disableClose: true,
      width: "700px",
      height: "500px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "Creado") {
        this.materiasGetByIdAlumno();
      }
    });
  }

  openDialogUpdate(dataAlumnoMateria: AlumnoMateria) {
    this.dialog.open(FormAMComponent, {
      disableClose: true,
      width: "350px",
      data: dataAlumnoMateria
    }).afterClosed().subscribe(resultado => {
      if (resultado === "Actualizado") {
        this.materiasGetByIdAlumno();
      }
    });
  }

  setAlerta(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  dialogoEliminar(dataAlumnoMateria: AlumnoMateria) {
    this.dialog.open(AlertaDeleteAMComponent, {
      disableClose: true,
      data: dataAlumnoMateria
    }).afterClosed().subscribe(resultado => {
      if (resultado === "Eliminar") {
        this.alumnoMateriaService.delete(dataAlumnoMateria.idAlumnoMateria).subscribe({
          next: (data) => {
            this.setAlerta("Se quito la asignacion de la materia", "Listo");
            this.materiasGetByIdAlumno();
          },
          error: (e) => { }
        })
      }
    });
  }
}
