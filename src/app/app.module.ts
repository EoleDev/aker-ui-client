import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontModule } from './font/font.module';
import { PanelComponent } from './panel/panel.component';
import { UsersComponent } from './users/users.component';
import { HostsComponent } from './hosts/hosts.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    UsersComponent,
    HostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
