import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { NavbarCategoriesComponent } from './components/navbar-categories/navbar-categories.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { CartComponent } from './components/cart/cart.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { OrderComponent } from './components/order/order.component';
import { OrderFeedbackComponent } from './components/order-feedback/order-feedback.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { RoleDirective } from './directives/role.directive';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { CartIndicatorComponent } from './components/cart-indicator/cart-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    StatisticsComponent,
    RegisterComponent,
    ShoppingPageComponent,
    NavbarCategoriesComponent,
    SearchProductComponent,
    CartComponent,
    DialogComponent,
    CheckoutComponent,
    ReceiptComponent,
    OrderComponent,
    OrderFeedbackComponent,
    AboutComponent,
    ProductComponent,
    RoleDirective,
    GalleryComponent,
    LoaderComponent,
    CartIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, OrderFeedbackComponent, CartComponent, GalleryComponent]
})
export class AppModule { }
