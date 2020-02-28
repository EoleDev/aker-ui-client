import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { HostsComponent } from './hosts/hosts.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'hosts', component: HostsComponent },
  { path: '**', component: UsersComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
