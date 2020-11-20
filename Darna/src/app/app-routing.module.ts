import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './front/register/register.component';
import { LoginComponent } from './front/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { ContainerComponent } from './shared/home/container/container.component';
import { ListeDemandeComponent } from './back/liste-demande/liste-demande.component';
import { AuthGuard } from './front/guards/auth.guard';
import { ListmembersComponent } from './back/listmembers/listmembers.component';
import { DetailsmembreComponent } from './back/listmembers/detailsmembre/detailsmembre.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ContainerComponent },
      {
        path: 'listmembers',
        component: ListmembersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listeDemandes',
        component: ListeDemandeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detailsMember/:idMember',
        component: DetailsmembreComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
