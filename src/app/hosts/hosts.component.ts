import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss']
})
export class HostsComponent {

  hostForm: FormGroup = this.fb.group({
    hosts: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  private newRow(): FormGroup {
    return this.fb.group({
      name: [''],
      hostname: [''],
      port: [''],
      key: [''],
      edit: [true]
    });
  }

  get hosts(): FormArray {
    return this.hostForm.get('hosts') as FormArray;
  }

  addUser(): void {
    const tmp = <FormArray>this.hostForm.get('hosts');
    tmp.push(this.newRow());
  }

  remove(id: number) {
    const tmp = <FormArray>this.hostForm.get('hosts');
    tmp.removeAt(id);
  }

  edit(id: number): void {
    const tmp = <FormArray>this.hostForm.get('hosts');
    tmp.controls[id].get('edit').setValue(false);
  }

  readOnly(id: number): boolean {
    const tmp = <FormArray>this.hostForm.get('hosts');
    return tmp.controls[id].get('edit').value;
  }
}
