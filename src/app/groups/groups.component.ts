import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '../../../node_modules/@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { Entry } from '../class/entry';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groupForm: FormGroup = this.fb.group({
    hostgroups: this.fb.array([]),
    usergroups: this.fb.array([])
  });

  private savedElemHost: object = {};
  private savedElemUser: object = {};

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUsergroups().subscribe(usergroups => {
      let form = this.groupForm.get('usergroups') as FormArray;
      form.clear();

      usergroups.forEach(e => {
        let tmp = this.newRow();
        tmp.patchValue(e);
        tmp.patchValue({
          edit: false,
          new: false
        });
        form.push(tmp);
      });
    });
    this.dataService.getHostgroups().subscribe(hostgroups => {
      let form = this.groupForm.get('hostgroups') as FormArray;
      form.clear();

      hostgroups.forEach(e => {
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
      edit: [true],
      new: [true]
    });
  }

  get hostgroups(): FormArray {
    return this.groupForm.get('hostgroups') as FormArray;
  }

  get usergroups(): FormArray {
    return this.groupForm.get('usergroups') as FormArray;
  }

  addUserGroup(): void {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    tmp.push(this.newRow());
  }

  addHostGroup(): void {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    tmp.push(this.newRow());
  }

  removeHostGroup(id: number) {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    this.dataService.deleteHostGroup(tmp.controls[id].get('id').value).subscribe(res => {
      tmp.removeAt(id);
    });
  }

  removeUserGroup(id: number) {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    this.dataService.deleteUserGroup(tmp.controls[id].get('id').value).subscribe(res => {
      tmp.removeAt(id);
    });
  }

  editHostGroup(id: number): void {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    this.savedElemHost[id] = (<FormGroup>tmp.controls[id]).getRawValue();
    tmp.controls[id].get('edit').setValue(true);
  }

  editUserGroup(id: number): void {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    this.savedElemUser[id] = (<FormGroup>tmp.controls[id]).getRawValue();
    tmp.controls[id].get('edit').setValue(true);
  }

  cancelHostGroup(id: number): void {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    tmp.controls[id].patchValue(this.savedElemHost[id]);
    tmp.controls[id].get('edit').setValue(false);
  }

  cancelUserGroup(id: number): void {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    tmp.controls[id].patchValue(this.savedElemUser[id]);
    tmp.controls[id].get('edit').setValue(false);
  }

  validateHostGroup(id: number): void {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    let data = (<FormGroup>tmp.controls[id]).getRawValue() as Entry;
    delete data.edit;
    this.dataService.changeHostGroup(data).subscribe(hostgroup => {
      if(hostgroup)
        tmp.controls[id].patchValue(hostgroup); 
      tmp.controls[id].get('edit').setValue(false);
      tmp.controls[id].get('new').setValue(false);
    });
  }

  validateUserGroup(id: number): void {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    let data = (<FormGroup>tmp.controls[id]).getRawValue() as Entry;
    delete data.edit;
    this.dataService.changeUserGroup(data).subscribe(usergroup => {
      if(usergroup)
        tmp.controls[id].patchValue(usergroup); 
      tmp.controls[id].get('edit').setValue(false);
      tmp.controls[id].get('new').setValue(false);
    });
  }

  readOnlyHostGroup(id: number): boolean {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    return !tmp.controls[id].get('edit').value;
  }

  readOnlyUserGroup(id: number): boolean {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    return !tmp.controls[id].get('edit').value;
  }

  isNewHostGroup(id: number): boolean {
    const tmp = <FormArray>this.groupForm.get('hostgroups');
    return tmp.controls[id].get('new').value;
  }

  isNewUserGroup(id: number): boolean {
    const tmp = <FormArray>this.groupForm.get('usergroups');
    return tmp.controls[id].get('new').value;
  }
}
