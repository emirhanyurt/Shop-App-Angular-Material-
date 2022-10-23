
import { BasketModel } from "./basket";
import { PaymentModel } from "./payment";

export class BasketPaymentModelDto{
    payment:PaymentModel
    baskets:BasketModel[]
    total:number
}