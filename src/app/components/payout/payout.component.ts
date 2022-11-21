import { Component, Input } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator.model';
import { Order } from 'src/app/models/order.model';
import { Payout } from 'src/app/models/payout.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent {
  @Input() newOrder: string = '';
  @Input() newCollaborator: string = '';

  constructor(private orderService: OrderService, private collaboratorService: CollaboratorService) { }

  orders: Order[] = [];
  collaborators: Collaborator[] = []
  payouts: Payout[] = [];

  ngOnChanges() : void {
    this.calculatePayouts();
  }

  getOrders() : void {
    this.orders = this.orderService.read()!;
  }

  getCollaborators() : void {
    this.collaborators = this.collaboratorService.read()!;
  }

  calculatePayouts() : void {
    this.getOrders();
    this.getCollaborators();

    this.payouts = [];

    this.collaborators.forEach((collaborator: Collaborator) => {
      var percentageAsTranslator = this.calculatePercentageAsTranslator(collaborator);
      var payout = this.calculateCollaboratorPayout(collaborator);
      this.payouts.push(payout);
    });
  }

  calculatePercentageAsTranslator(collaborator: Collaborator) {
    var otherCollaborators;
    var othersCollaboratorPercentage;
  }

  calculateCollaboratorPayout(collaborator: Collaborator) : Payout {
    var translatedOrders = this.orders.filter(order => order.translator === collaborator.name);
    var payoutFromTranslated = translatedOrders.reduce((accumulator, object) => {
      return accumulator + (object.amount * 0.8);
    }, 0)

    var collaboratedOrders = this.orders.filter(order => order.translator != collaborator.name);
    var payoutFromCollaborated = collaboratedOrders.reduce((accumulator, object) => {
      return accumulator + (object.amount * 0.8);
    }, 0)

    var amountToPayout = payoutFromTranslated + payoutFromCollaborated;
    var payout = new Payout(collaborator.name, amountToPayout, translatedOrders.length);
    return payout;
  }
}
