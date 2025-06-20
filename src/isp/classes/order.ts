import { OrderStatus } from "./interfaces/order-status";
import { Messaging } from "../services/messaging";
import { Persistency } from "../services/persistency";
import { ShoppingCart } from "./shopping-cart";
import { CustomerOrder } from "./interfaces/customer-protocol";

export class Order {
  private _orderStatus: OrderStatus = "open";

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly presistency: Persistency,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log("Seu carrinho está vazio");
      return;
    }

    this._orderStatus = "closed";
    this.messaging.sendMessage(`Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido`);
    this.presistency.saveOrder();
    this.cart.clear();

    console.log("O cliente é:", this.customer.getName(), this.customer.getIDN());
  }
}
