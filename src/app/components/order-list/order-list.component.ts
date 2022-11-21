import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Collaborator } from 'src/app/models/collaborator.model';
import { Order } from 'src/app/models/order.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  @Output() newOrderEvent = new EventEmitter<string>();
  @Input() newCollaborator: string = '';

  constructor(private collaboratorsService: CollaboratorService, private orderService: OrderService) { }

  orders: Order[] = [];
  collaborators: Collaborator[] = []
  orderDialog: boolean = false;
  newOrderForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(14)]),
    buyer: new FormControl('', [Validators.required, Validators.maxLength(24)]),
    amount: new FormControl(5, [Validators.required, Validators.min(5)]),
    translator: new FormControl('', [Validators.required]),
    id: new FormControl()
  });

  ngOnChanges(changes: SimpleChanges) : void {
    this.getOrders();
    this.getCollaborators();
  }

  getOrders() : void {
    this.orders = this.orderService.read()!;
  }

  getCollaborators() : void {
    this.collaborators = this.collaboratorsService.read()!;
  }

  addOrder() : void {
    this.newOrderForm.reset();
    this.newOrderForm.controls['amount'].setValue(5);
    this.orderDialog = true;
  }

  editOrder(order: Order) : void {
    this.newOrderForm.setValue({
      name: order.name,
      buyer: order.buyer,
      amount: order.amount,
      translator: order.translator,
      id: order.id
    })
    this.orderDialog = true;
  }

  saveOrder() : void {
    if(this.newOrderForm.value.id == null)
      this.orderService.add(new Order(
        this.newOrderForm.value.name,
        this.newOrderForm.value.buyer,
        this.newOrderForm.value.amount,
        this.newOrderForm.value.translator
      ));
    else {
      var order = new Order(
        this.newOrderForm.value.name,
        this.newOrderForm.value.buyer,
        this.newOrderForm.value.amount,
        this.newOrderForm.value.translator
      );
      order.id = this.newOrderForm.value.id;
      this.orderService.update(order);
    }
    this.hideDialog();
    this.getOrders();
  }

  removeOrder(order: Order) : void {
    this.orderService.remove(order);
    this.getOrders();
  }

  hideDialog() : void {
    this.orderDialog = false;
  }
}
