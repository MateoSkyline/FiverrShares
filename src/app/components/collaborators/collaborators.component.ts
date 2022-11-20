import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Collaborator } from 'src/app/models/collaborator.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {
  @Output() newCollaboratorEvent = new EventEmitter<string>();

  constructor(private collaboratorService: CollaboratorService) { }

  collaborators: Collaborator[] = [];
  clonedCollaborators: { [s: string]: Collaborator } = {};

  ngOnInit(): void {
    this.getCollaborators();
  }

  getCollaborators() : void {
    this.collaborators = this.collaboratorService.read()!;
  }

  addEmpty() : void {
    this.collaboratorService.addEmpty();
    this.getCollaborators();
  }

  update(collaborator: Collaborator) {
    this.collaboratorService.update(collaborator);
    this.newCollaboratorEvent.emit(JSON.stringify(collaborator));
  }

  remove(collaborator: Collaborator) {
    this.collaboratorService.remove(collaborator);
    this.getCollaborators();
  }
}
