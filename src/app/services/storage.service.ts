import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  read<T>(name: string) : T[] | null {
    var object: T[];
    var data = localStorage.getItem(name);
    if(data == null)
      return null;
    object = JSON.parse(data);
    return object;
  }

  save<T>(data: T[], name: string) : void {
    var _data: string = JSON.stringify(data);
    localStorage.setItem(name, _data);
  }

  add<T>(object: T, name: string) : void {
    var data = this.read<T>(name);
    if(data == null) data = [];
    data.push(object);
    this.save<T>(data, name);
  }

  remove<T>(id: string, name: string) : void {
    var data = this.read<T & { id?: string }>(name);
    if(data == null) return
    data = data?.filter(x => x.id !== id);
    this.save<T>(data, name);
  }
}
