import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MicroserviceStore } from './store/microservice.store';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CustomerRegisterComponent,
    CustomerLoginComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  providers: [MicroserviceStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
