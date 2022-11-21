export class Payout {
    translator: string = '';
    amount: number = 0;
    orders: number = 0;

    constructor(translator: string, amount: number, orders: number) {
        this.translator = translator;
        this.amount = amount;
        this.orders = orders;
    }
}