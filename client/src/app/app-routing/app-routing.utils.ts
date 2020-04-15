import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { ShoppingPageComponent } from '../components/shopping-page/shopping-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { RoleGuard } from '../guards/role.guard';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { OrderGuard } from '../guards/order.guard';


export const appRoutes: Routes = [
    {path: '', redirectTo : '/home', pathMatch: 'full'},    
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'shopping-page', component: ShoppingPageComponent, canActivate: [AuthGuard]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard, RoleGuard], canDeactivate: [OrderGuard]},
    {path: '**', redirectTo : '/home'}, 
];