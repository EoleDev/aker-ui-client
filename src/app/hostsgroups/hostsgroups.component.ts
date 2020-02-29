import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '../../../node_modules/@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { Entry } from '../class/entry';

@Component({
  selector: 'app-hostsgroups',
  templateUrl: './hostsgroups.component.html',
  styleUrls: ['./hostsgroups.component.scss']
})
export class HostsGroupsComponent implements OnInit {

  hostsgroupForm: FormGroup = this.fb.group({
    groups: this.fb.array([])
  });

  hostgroups: Array<any> = new Array<any>();
  usergroups: Array<any> = new Array<any>();

  private savedElem: object = {};

  constructor(private fb: FormBuilder, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getHosts().subscribe(hosts => {
      let form = this.hostsgroupForm.get('groups') as FormArray;
      form.clear();

      hosts.forEach(e => {
        let tmp = this.newRow();
        tmp.patchValue(e);
        form.push(tmp);
      });
    });

    this.dataService.getUsergroups().subscribe(groups => {
      this.usergroups = groups;
    });

    this.dataService.getHostgroups().subscribe(groups => {
      this.hostgroups = groups;
    });
  }

  private newRow(): FormGroup {
    return this.fb.group({
      id: [-1],
      name: [''],
      usergroups: [new Array<number>()],
      hostgroups: [new Array<number>()],
      edit: [false]
    });
  }

  get groups(): FormArray {
    return this.hostsgroupForm.get('groups') as FormArray;
  }

  edit(id: number): void {
    const tmp = <FormArray>this.hostsgroupForm.get('groups');
    this.savedElem[id] = (<FormGroup>tmp.controls[id]).getRawValue();
    tmp.controls[id].get('edit').setValue(true);
  }

  cancel(id: number): void {
    const tmp = <FormArray>this.hostsgroupForm.get('groups');
    tmp.controls[id].patchValue(this.savedElem[id]);
    tmp.controls[id].get('edit').setValue(false);
  }

  validate(id: number): void {
    const tmp = <FormArray>this.hostsgroupForm.get('groups');
    let data = (<FormGroup>tmp.controls[id]).getRawValue() as Entry;
    delete data.edit;
    this.dataService.changeHost(data).subscribe(host => {
      if(host)
        tmp.controls[id].patchValue(host); 
      tmp.controls[id].get('edit').setValue(false);
    });
  }

  readOnly(id: number): boolean {
    const tmp = <FormArray>this.hostsgroupForm.get('groups');
    return !tmp.controls[id].get('edit').value;
  }
}
