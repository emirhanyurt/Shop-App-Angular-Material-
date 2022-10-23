import { OrderModel } from "./order";
import { PaymentModel } from "./payment";

export class OrderModelDto{
    orders:OrderModel[]
    payment:PaymentModel
    total:number
    
}