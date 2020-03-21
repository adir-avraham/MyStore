import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { ShoppingPageComponent } from '../components/shopping-page/shopping-page.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { CheckoutComponent } from '../components/checkout/checkout.component';


export const appRoutes: Routes = [
    {path: '', redirectTo : '/home', pathMatch: 'full'},    
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'shopping-page', component: ShoppingPageComponent, canActivate: [AuthGuard]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo : '/home'}, 
];