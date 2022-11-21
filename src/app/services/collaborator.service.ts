import { Injectable } from '@angular/core';
import { Collaborator } from '../models/collaborator.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private storageService: StorageService) { }

  readonly storageName: string = 'fiverrshare-collaborators';

  read() : Collaborator[] | null {
    return this.storageService.read<Collaborator>(this.storageName);
  }

  save(collaborators: Collaborator[]) : void {
    this.storageService.save<Collaborator>(collaborators, this.storageName);
  }

  add(collaborator: Collaborator) : void {
    collaborator.id = uuidv4();
    this.storageService.add<Collaborator>(collaborator, this.storageName);
  }

  update(collaborator: Collaborator) : void {
    var collaborators: Collaborator[] = this.read()!;
    if(collaborators == null) collaborators = [];
    var index = collaborators.findIndex(x => x.id == collaborator.id);
    collaborators[index] = collaborator;
    collaborators.push(collaborators.splice(index, 1)[0]);
    this.save(collaborators);
  }

  remove(collaborator: Collaborator) : void {
    this.storageService.remove<Collaborator>(collaborator.id, this.storageName);
  }

  addEmpty() : void {
    var collaborator = new Collaborator();
    collaborator.name = "Enter name";
    collaborator.asTranslator = 90;
    collaborator.asCollaborator = 10;
    this.add(collaborator);
  }
}
