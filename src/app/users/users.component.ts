import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  userForm: FormGroup = this.fb.group({
    users: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  private newRow(): FormGroup {
    return this.fb.group({
      username: [''],
      keyfile: [''],
      edit: [true]
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
    tmp.removeAt(id);
  }

  edit(id: number): void {
    const tmp = <FormArray>this.userForm.get('users');
    tmp.controls[id].get('edit').setValue(false);
  }

  readOnly(id: number): boolean {
    const tmp = <FormArray>this.userForm.get('users');
    return tmp.controls[id].get('edit').value;
  }
}
