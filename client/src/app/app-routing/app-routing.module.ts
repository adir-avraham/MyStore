import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app-routing.utils';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }