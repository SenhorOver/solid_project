type CartItem = { name: string; price: number };
type OrderStatus = "open" | "closed";

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = "open";

  public addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return +this._items.reduce((acc, vl) => acc + vl.price, 0).toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log("Seu carrinho está vazio");
      return;
    }

    this._orderStatus = "closed";
    this.sendMessage(`Seu pedido com total de ${this.total()} foi recebido`);
    this.saveOrder();
    this.clear();
  }

  clear(): void {
    console.log("Carrinho de compras limpo");
    this._items.length = 0;
  }

  sendMessage(msg: string): void {
    console.log("Mensagem enviada: ", msg);
  }

  saveOrder(): void {
    console.log("Pedido salvo com sucesso");
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: "Camiseta", price: 49.91 });
shoppingCart.addItem({ name: "Caderno", price: 9.934 });
shoppingCart.addItem({ name: "Lápis", price: 1.59 });

console.log(shoppingCart.orderStatus);
console.log(shoppingCart.items);
console.log(shoppingCart.total());
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
