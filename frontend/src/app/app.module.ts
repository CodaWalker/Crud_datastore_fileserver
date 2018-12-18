import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from '@angular/material/sort';
import {
  MatPaginatorModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule

} from "@angular/material";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDSComponent } from './components/listDS/listDS.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { EditDSComponent } from './components/editDS/editDS.component';
import {NotFoundComponent} from "./components/not-found/not-found.component"
import {CardService} from "./card.service";
import { HomeComponent } from './components/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDSComponent,
    CreateComponent,
    EditComponent,
    EditDSComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    MatSortModule,
    MatPaginatorModule,
    NotFoundComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [
    CardService, CreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
