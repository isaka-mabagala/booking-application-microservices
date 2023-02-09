import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { BookingRoomComponent } from './components/booking-room/booking-room.component';
import { BookingTransactionDetailComponent } from './components/booking-transaction-detail/booking-transaction-detail.component';
import { BookingTransactionComponent } from './components/booking-transaction/booking-transaction.component';
import { BookingComponent } from './components/booking/booking.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { CustomerReviewComponent } from './components/customer-review/customer-review.component';
import { UpdateReviewComponent } from './components/update-review/update-review.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MicroserviceStore } from './store/microservice.store';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CustomerRegisterComponent,
    CustomerLoginComponent,
    WelcomeComponent,
    BookingComponent,
    BookingRoomComponent,
    BookingTransactionComponent,
    BookingTransactionDetailComponent,
    CustomerReviewComponent,
    AddReviewComponent,
    UpdateReviewComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  providers: [MicroserviceStore],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
