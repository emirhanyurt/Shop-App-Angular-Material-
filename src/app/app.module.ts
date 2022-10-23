import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';
import { DialogOverviewExampleDialog,paymentDialog } from './components/home/home.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrderComponent } from './components/order/order.component';
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './components/login/login.component'
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    HomeComponent,
    DialogOverviewExampleDialog,
    paymentDialog,
    OrderComponent,
    FilterPipe,
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    ToastNoAnimationModule.forRoot()
  ],
  providers: [{provide: "apiUrl",useValue:"https://webapi.angulareducation.com/api/"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
