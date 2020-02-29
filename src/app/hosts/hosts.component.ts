import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '../../../node_modules/@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { Entry } from '../class/entry';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss']
})
export class HostsComponent implements OnInit {

  hostForm: FormGroup = this.fb.group({
    hosts: this.fb.array([])
  });

  private savedElem: object = {};

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getHosts().subscribe(hosts => {
      let form = this.hostForm.get('hosts') as FormArray;
      form.clear();

      hosts.forEach(e => {
        let tmp = this.newRow();
        tmp.patchValue(e);
        tmp.patchValue({
          edit: false,
          new: false
        });
        form.push(tmp);
      });
    });
  }

  private newRow(): FormGroup {
    return this.fb.group({
      id: [-1],
      name: [''],
      hostname: [''],
      port: [''],
      key: [''],
      edit: [true],
      new: [true]
    });
  }

  get hosts(): FormArray {
    return this.hostForm.get('hosts') as FormArray;
  }

  addHost(): void {
    const tmp = <FormArray>this.hostForm.get('hosts');
    tmp.push(this.newRow());
  }

  remove(id: number) {
    const tmp = <FormArray>this.hostForm.get('hosts');
    this.dataService.deleteHost(tmp.controls[id].get('id').value).subscribe(res => {
      tmp.removeAt(id);
    });
  }

  edit(id: number): void {
    const tmp = <FormArray>this.hostForm.get('hosts');
    this.savedElem[id] = (<FormGroup>tmp.controls[id]).getRawValue();
    tmp.controls[id].get('edit').setValue(true);
  }

  cancel(id: number): void {
    const tmp = <FormArray>this.hostForm.get('hosts');
    tmp.controls[id].patchValue(this.savedElem[id]);
    tmp.controls[id].get('edit').setValue(false);
  }

  validate(id: number): void {
    const tmp = <FormArray>this.hostForm.get('hosts');
    let data = (<FormGroup>tmp.controls[id]).getRawValue() as Entry;
    delete data.edit;
    this.dataService.changeHost(data).subscribe(host => {
      if(host)
        tmp.controls[id].patchValue(host);
      tmp.controls[id].get('edit').setValue(false);
      tmp.controls[id].get('new').setValue(false);
    });
  }

  readOnly(id: number): boolean {
    const tmp = <FormArray>this.hostForm.get('hosts');
    return !tmp.controls[id].get('edit').value;
  }

  isNew(id: number): boolean {
    const tmp = <FormArray>this.hostForm.get('hosts');
    return tmp.controls[id].get('new').value; 
  }
}
