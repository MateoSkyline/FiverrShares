import { Component, Input, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  @Input() newOrder: string = '';

  constructor(private orderService: OrderService) { }

  orders: Order[] = [];

  ngOnChanges(changes: SimpleChanges) : void {
    this.getOrders();
  }

  getOrders() : void {
    this.orders = this.orderService.read()!;
    console.log(this.orders);
  }
}
