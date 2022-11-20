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

  remove(order: Order) : void {
    this.storageService.remove<Order>(order.id, this.storageName);
  }
}
