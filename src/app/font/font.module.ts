import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faUser, faBars, faCopyright, faAngleUp, faMinus, faPlus, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontModule { 

  constructor(library: FaIconLibrary){
    library.addIcons(faUser, faBars, faCopyright, faAngleUp, faMinus, faPlus, faTrash, faEdit, faCheck);
  }

}
