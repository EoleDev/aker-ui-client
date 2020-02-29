import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { HostsComponent } from './hosts/hosts.component';
import { GroupsComponent } from './groups/groups.component';
import { HostsGroupsComponent } from './hostsgroups/hostsgroups.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'hosts', component: HostsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'hostsgroups', component: HostsGroupsComponent },
  { path: '**', component: UsersComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
