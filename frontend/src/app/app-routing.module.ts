import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateComponent} from "./components/create/create.component";
import {EditComponent} from "./components/edit/edit.component";
import {ListComponent} from "./components/list/list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component"
import {EditDSComponent} from "./components/editDS/editDS.component";
import {ListDSComponent} from "./components/listDS/listDS.component";
import {HomeComponent} from "./components/home/home.component";
const routes: Routes = [
  {path: 'homepage', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'editDS/:id', component: EditDSComponent},
  {path: 'list', component: ListComponent},
  {path: 'listDS', component: ListDSComponent},
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
