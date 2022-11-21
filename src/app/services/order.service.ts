import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private storageService: StorageService) { }

  readonly storageName: string = 'fiverrshare-orders';

  read() : Order[] | null {
    return this.storageService.read<Order>(this.storageName);
  }

  save(orders: Order[]) : void {
    this.storageService.save<Order>(orders, this.storageName);
  }

  add(order: Order) : void {
    order.id = uuidv4();
    this.storageService.add<Order>(order, this.storageName);
  }

  update(order: Order) : void {
    var orders: Order[] = this.read()!;
    if(orders == null) orders = [];
    var index = orders.findIndex(x => x.id == order.id);
    orders[index].name = order.name;
    orders[index].buyer = order.buyer;
    orders[index].amount = order.amount;
    orders[index].translator = order.translator;
    orders.push(orders.splice(index, 1)[0]);
    this.save(orders);
  }

  remove(order: Order) : void {
    this.storageService.remove<Order>(order.id, this.storageName);
  }
}
