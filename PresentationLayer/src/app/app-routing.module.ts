import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { AlumnomateriaComponent } from './vistas/alumnomateria/alumnomateria.component';
import { MateriaComponent } from './vistas/materia/materia.component';
import { AlumnoComponent } from './vistas/alumno/alumno.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'alumnomateria/:id', component: AlumnomateriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
