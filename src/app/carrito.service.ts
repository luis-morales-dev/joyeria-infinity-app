import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  //Arreglo para la lista de productos del carrito
  public cart:any[] = [];

  getCart(){
    return this.cart;
  }

  addProduct(product:any){
    //this.loadCart();
    this.cart.push(product);
  }

  removeCart(){
    this.cart = [];
  }

  constructor() { }
}
