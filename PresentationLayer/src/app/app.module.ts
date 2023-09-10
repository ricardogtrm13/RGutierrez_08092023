import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './vistas/alumno/alumno.component';
import { MateriaComponent } from './vistas/materia/materia.component';
import { NavmenuComponent } from './vistas/navmenu/navmenu.component';
import { AlumnomateriaComponent } from './vistas/alumnomateria/alumnomateria.component';
import { HomeComponent } from './vistas/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes Extras
import {ReactiveFormsModule} from '@angular/forms'; //Permite trabajar con formularios
import { HttpClientModule } from '@angular/common/http'; //Permite realizar peticiones HTTP
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
//Alertas
import {MatSnackBarModule} from '@angular/material/snack-bar'
//Cuadros de dialogo
import {MatDialogModule} from '@angular/material/dialog'
//Columnas y filas
import {MatGridListModule} from '@angular/material/grid-list';
import { FormComponent } from './vistas/alumno/form/form.component';
import { AlertaDeleteComponent } from './vistas/alumno/alerta-delete/alerta-delete.component';
import { FormMComponent } from './vistas/materia/form-m/form-m.component';
import { AlertaDeleteMComponent } from './vistas/materia/alerta-delete-m/alerta-delete-m.component';
import { AlertaDeleteAMComponent } from './vistas/alumnomateria/alerta-delete-am/alerta-delete-am.component';
import { FormAMComponent } from './vistas/alumnomateria/form-am/form-am.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    MateriaComponent,
    NavmenuComponent,
    AlumnomateriaComponent,
    HomeComponent,
    FormComponent,
    AlertaDeleteComponent,
    FormMComponent,
    AlertaDeleteMComponent,
    AlertaDeleteAMComponent,
    FormAMComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
