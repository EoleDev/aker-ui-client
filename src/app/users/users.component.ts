import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '../../../node_modules/@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { Entry } from '../class/entry';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  userForm: FormGroup = this.fb.group({
    users: this.fb.array([])
  });
  usergroups: Array<any> = new Array<any>();

  private savedElem: object = {};

  constructor(private fb: FormBuilder, public dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(users => {
      let form = this.userForm.get('users') as FormArray;
      form.clear();

      users.forEach(e => {
        let tmp = this.newRow();
        tmp.patchValue(e);
        tmp.patchValue({
          edit: false,
          new: false
        });
        form.push(tmp);
      });
    });

    this.dataService.getUsergroups().subscribe(groups => {
      this.usergroups = groups;
    });
  }

  ngOnDestroy(): void { }

  private newRow(): FormGroup {
    return this.fb.group({
      id: [-1],
      username: [''],
      keyfile: [''],
      groups: [new Array<number>()],
      edit: [true],
      new: [true]
    });
  }

  get users(): FormArray {
    return this.userForm.get('users') as FormArray;
  }

  addUser(): void {
    const tmp = <FormArray>this.userForm.get('users');
    tmp.push(this.newRow());
  }

  remove(id: number) {
    const tmp = <FormArray>this.userForm.get('users');
    this.dataService.deleteUser(tmp.controls[id].get('id').value).subscribe(res => {
      tmp.removeAt(id);
    });
  }

  edit(id: number): void {
    const tmp = <FormArray>this.userForm.get('users');
    this.savedElem[id] = (<FormGroup>tmp.controls[id]).getRawValue();
    tmp.controls[id].get('edit').setValue(true);
  }

  cancel(id: number): void {
    const tmp = <FormArray>this.userForm.get('users');
    tmp.controls[id].patchValue(this.savedElem[id]);
    tmp.controls[id].get('edit').setValue(false);
  }

  validate(id: number): void {
    const tmp = <FormArray>this.userForm.get('users');
    let data = (<FormGroup>tmp.controls[id]).getRawValue() as Entry;
    delete data.edit;
    this.dataService.changeUser(data).subscribe(user => {
      if(user)
        tmp.controls[id].patchValue(user); 
      tmp.controls[id].get('edit').setValue(false);
      tmp.controls[id].get('new').setValue(false);
    });
  }

  readOnly(id: number): boolean {
    const tmp = <FormArray>this.userForm.get('users');
    return !tmp.controls[id].get('edit').value;
  }

  isNew(id: number): boolean {
    const tmp = <FormArray>this.userForm.get('users');
    return tmp.controls[id].get('new').value;
  }
}
