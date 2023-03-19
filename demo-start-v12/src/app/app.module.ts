import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { EmailGroupComponent } from './email-group/email-group.component';


@NgModule({
  declarations: [AppComponent, CustomerComponent, EmailGroupComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
