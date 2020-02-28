import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isCollapsed: boolean = false;

  public sidebarColor: string = 'sidebar-black';
  public navbarColor: string = 'navbar-black';

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  scrollTop(): void {
    window.scroll(0, 0);
  }

}
