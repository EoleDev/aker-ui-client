import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { RequestService } from './request.service';
import { Entry } from '../class/entry';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serviceUrl = "/";

  constructor(private req: RequestService) {
    this.req.get<Array<any>>(this.serviceUrl+"hostgroups").subscribe(groups => {
    });
    this.req.get<Array<any>>(this.serviceUrl+"hosts").subscribe(hosts => {
    });
  }

  getUsers(): Observable<Array<any>> {
    return this.req.get<Array<any>>(this.serviceUrl+"users");
  }

  getHosts(): Observable<Array<any>> {
    return this.req.get<Array<any>>(this.serviceUrl+"hosts");
  }

  getUsergroups(): Observable<Array<any>>{
    return this.req.get<Array<any>>(this.serviceUrl+"usergroups");
  }

  getHostgroups(): Observable<Array<any>>{
    return this.req.get<Array<any>>(this.serviceUrl+"hostgroups");
  }

  changeUser(data: Entry): Observable<any> {
    if(data.new){
      delete data.new;
      return this.req.post<object>(this.serviceUrl+"users", data);
    }else{
      delete data.new;
      return this.req.put<object>(this.serviceUrl+"users/"+data.id, data);
    }
  }

  changeHost(data: Entry): Observable<any> {
    if(data.new){
      delete data.new;
      return this.req.post<object>(this.serviceUrl+"hosts", data);
    }else{
      delete data.new;
      return this.req.put<object>(this.serviceUrl+"hosts/"+data.id, data);
    }
  }

  changeHostGroup(data: Entry): Observable<any> {
    if(data.new){
      delete data.new;
      return this.req.post<object>(this.serviceUrl+"hostgroups", data);
    }else{
      delete data.new;
      return this.req.put<object>(this.serviceUrl+"hostgroups/"+data.id, data);
    }
  }

  changeUserGroup(data: Entry): Observable<any> {
    if(data.new){
      delete data.new;
      return this.req.post<object>(this.serviceUrl+"usergroups", data);
    }else{
      delete data.new;
      return this.req.put<object>(this.serviceUrl+"usergroups/"+data.id, data);
    }
  }

  deleteUser(id: number): Observable<any> {
    return this.req.delete(this.serviceUrl+"users/"+id);
  }

  deleteHost(id: number): Observable<any> {
    return this.req.delete(this.serviceUrl+"hosts/"+id);
  }

  deleteUserGroup(id: number): Observable<any> {
    return this.req.delete(this.serviceUrl+"usergroups/"+id);
  }

  deleteHostGroup(id: number): Observable<any> {
    return this.req.delete(this.serviceUrl+"hostgroups/"+id);
  }
}
