import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  newOrder: string = '';
  newCollaborator: string = '';

  ngOnInit(): void {
  }

  reloadOrders(order: string) : void {
    this.newOrder = order;
  }

  reloadCollaborators(collaborator: string) : void {
    this.newCollaborator = collaborator;
  }
}
