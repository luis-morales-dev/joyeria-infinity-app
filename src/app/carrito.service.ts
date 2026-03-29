import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseInterface, WooCategoria, WooProducto, WooImagen } from 'src/app/modelos/response.interface';

export interface ItemCarrito {
  producto: WooProducto;
  cantidad: number;
  variaciones: Record<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  //Arreglo para la lista de productos del carrito
  /*public cart:any[] = [];

  getCart(){
    return this.cart;
  }

  addProduct(product:any){
    this.cart.push(product);
  }

  removeCart(){
    this.cart = [];
  }

  constructor() { }
  */

  private items$ = new BehaviorSubject<ItemCarrito[]>([]);
 
  // Observable público para que cualquier página se suscriba
  readonly items     = this.items$.asObservable();
  readonly cantidad$ = new BehaviorSubject<number>(0);
 
  // ─── Agregar producto ───────────────────────────────────────────────────
 
  agregar(producto: WooProducto, cantidad: number = 1, variaciones: Record<string, string> = {}) {
    const actuales = this.items$.getValue();
    const idx = actuales.findIndex(
      i => i.producto.id === producto.id &&
           JSON.stringify(i.variaciones) === JSON.stringify(variaciones)
    );
 
    if (idx >= 0) {
      // Ya existe: sumar cantidad
      const copia = [...actuales];
      copia[idx] = { ...copia[idx], cantidad: copia[idx].cantidad + cantidad };
      this.items$.next(copia);
    } else {
      // Nuevo item
      this.items$.next([...actuales, { producto, cantidad, variaciones }]);
    }
 
    this.actualizarContador();
  }
 
  // ─── Cambiar cantidad ───────────────────────────────────────────────────
 
  cambiarCantidad(index: number, delta: number) {
    const copia = [...this.items$.getValue()];
    const nueva = copia[index].cantidad + delta;
 
    if (nueva <= 0) {
      this.eliminar(index);
      return;
    }
 
    copia[index] = { ...copia[index], cantidad: nueva };
    this.items$.next(copia);
    this.actualizarContador();
  }
 
  // ─── Eliminar producto ──────────────────────────────────────────────────
 
  eliminar(index: number) {
    const copia = [...this.items$.getValue()];
    copia.splice(index, 1);
    this.items$.next(copia);
    this.actualizarContador();
  }
 
  // ─── Vaciar carrito ─────────────────────────────────────────────────────
 
  vaciar() {
    this.items$.next([]);
    this.cantidad$.next(0);
  }
 
  // ─── Totales ────────────────────────────────────────────────────────────
 
  get subtotal(): number {
    return this.items$.getValue().reduce((acc, item) => {
      return acc + (parseFloat(item.producto.price) * item.cantidad);
    }, 0);
  }
 
  get totalItems(): number {
    return this.items$.getValue().reduce((acc, item) => acc + item.cantidad, 0);
  }
 
  // ─── Construir URL de checkout de WooCommerce ───────────────────────────
  //
  // WooCommerce acepta productos en la URL del carrito con este formato:
  // /cart?add-to-cart=ID&quantity=N
  //
  // Para múltiples productos usamos el endpoint de "fill cart" vía URL:
  // /?fill_cart=ID1:QTY1,ID2:QTY2
 
  buildCheckoutUrl(baseUrl: string): string {
    const items = this.items$.getValue();
    if (items.length === 0) return `${baseUrl}/checkout`;
 
    const params = items
      .map(i => `${i.producto.id}:${i.cantidad}`)
      .join(',');
 
    return `${baseUrl}/?fill_cart=${params}`;
  }
 
  // ─── Privado ────────────────────────────────────────────────────────────
 
  private actualizarContador() {
    this.cantidad$.next(this.totalItems);
  }
}
