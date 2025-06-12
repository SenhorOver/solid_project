// ISP - os clientes não devem ser forçados a depender de interfaces que não utilizam

import { Messaging } from "./services/messaging";
import { Order } from "./classes/order";
import { Persistency } from "./services/persistency";
import { Product } from "./classes/product";
import { ShoppingCart } from "./classes/shopping-cart";
import { NoDiscount } from "./classes/discount";
import { EnterpriseCustomer } from "./classes/customer";

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer("Marcos", "Silva", "000.000.000-00");
const enterprisecustomer = new EnterpriseCustomer("Empresa Gigante", "1111.111.111/1111-11");
const order = new Order(shoppingCart, messaging, persistency, enterprisecustomer);

shoppingCart.addItem(new Product("Camiseta", 49.0));
shoppingCart.addItem(new Product("Caderno", 9.0));
shoppingCart.addItem(new Product("Lápis", 2.0));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
