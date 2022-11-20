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

  add(collaborator: Collaborator) : void {
    collaborator.id = uuidv4();
    this.storageService.add<Collaborator>(collaborator, this.storageName);
  }
}
