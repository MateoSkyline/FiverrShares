import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Collaborator } from 'src/app/models/collaborator.model';
import { Order } from 'src/app/models/order.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
  @Output() newOrderEvent = new EventEmitter<string>();
  @Input() newCollaborator: string = '';

  constructor(private collaboratorsService: CollaboratorService, private orderService: OrderService) { }

  newOrder: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(14)]),
    buyer: new FormControl('', [Validators.required, Validators.maxLength(24)]),
    amount: new FormControl(5, [Validators.required, Validators.min(5)]),
    translator: new FormControl('', [Validators.required])
  });
  collaborators: Collaborator[] = []

  ngOnChanges(changes: SimpleChanges) : void {
    this.getCollaborators();
  }

  getCollaborators() : void {
    this.collaborators = this.collaboratorsService.read()!;
  }

  addOrder() : void {
    var order = new Order();
    order.name = this.newOrder.value.name;
    order.buyer = this.newOrder.value.buyer;
    order.amount = this.newOrder.value.amount;
    order.translator = this.newOrder.value.translator;
    this.orderService.add(order);
    this.newOrderEvent.emit(JSON.stringify(order));
  }

}
