import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { TiposClaseComponent } from './tipos-clase/tipos-clase.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent},
  {path: 'inicio', component: PaginaPrincipalComponent},
  {path: 'tipos-de-clase', component: TiposClaseComponent},
  
  {path: '**', component: PageNoFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }