import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path: '',component:LayoutComponent,children:[
    {path:'',component:HomeComponent},
    {path:'orders',component:OrderComponent},
    {path:'Login',component:LoginComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
