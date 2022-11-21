export class Order {
    id: string = '';
    name: string = '';
    buyer: string = '';
    amount: number = 0;
    translator: string = '';
    paid: boolean = false;

    constructor(name: string, buyer: string, amount: number, translator: string) { 
        this.name = name;
        this.buyer = buyer;
        this.amount = amount;
        this.translator = translator;
    }
}