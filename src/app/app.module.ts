import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontModule } from './font/font.module';
import { PanelComponent } from './panel/panel.component';
import { UsersComponent } from './users/users.component';
import { HostsComponent } from './hosts/hosts.component';
import { GroupsComponent } from './groups/groups.component';
import { HostsGroupsComponent } from './hostsgroups/hostsgroups.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    UsersComponent,
    HostsComponent,
    GroupsComponent,
    HostsGroupsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
