import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './shared/home/home.component';
import {NavbarComponent} from './shared/home/navbar/navbar.component';
import {FooterComponent} from './shared/home/footer/footer.component';
import {ContainerComponent} from './shared/home/container/container.component';
import {LoginComponent} from './front/login/login.component';
import {RegisterComponent} from './front/register/register.component'
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { ListmemberComponent } from './back/listmember/listmember.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ContainerComponent,
    LoginComponent,
    RegisterComponent,
    ListmemberComponent

  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule ,
    AppRoutingModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class AppModule { }
