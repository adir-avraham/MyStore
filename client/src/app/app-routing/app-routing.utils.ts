import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';


export const appRoutes: Routes = [
    {path: '', redirectTo : '/home', pathMatch: 'full'},    
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent}
];