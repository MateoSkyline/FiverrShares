import { Component, OnInit } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {

  constructor(private collaboratorService: CollaboratorService) { }

  collaborators: Collaborator[] = [];

  ngOnInit(): void {
    this.collaborators = this.collaboratorService.read()!;
  }

}
