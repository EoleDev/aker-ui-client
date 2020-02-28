import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent {

  @Input() heading: string;
  @Input() icon: string;

  public collapsed: boolean = false;

  constructor() {
    if(!this.heading)
      this.heading = "HEAD";
  }

}

