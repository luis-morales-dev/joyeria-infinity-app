//import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
//import { CarritoService } from '../carrito.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CarritoService, ItemCarrito } from '../carrito.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit, OnDestroy {

  items: ItemCarrito[] = [];
  private sub!: Subscription;
 
  // Exponer Math.parseFloat al template
  parseFloat = parseFloat;
 
  constructor(
    private carritoService: CarritoService,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    /*let Items = this.carrito.getCart();
    let selected: any = {};

    if(Items.length != 0){
      this.is_empty = false;
      for(let obj of Items){
        selected[obj.id] = {...obj, count: 1}
      }
  
      this.selectedItems = Object.keys(selected).map(key => selected[key])
      console.log('items: ', this.selectedItems);
      this.total = this.selectedItems.reduce((a, b) => a + (b.quantity * b.price), 0);
    }
    else{
      this.msg_cart = 'No hay productos en tu carrito'
    }*/

    this.sub = this.carritoService.items.subscribe(items => {
      this.items = items;
    });

   
  }

  /*remove(){
    this.carrito.removeCart();
    this.router.navigate(['/home']);
  }*/

    ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
  // ─── Getters desde el servicio ────────────────────────────────────────────
 
  get subtotal(): number {
    return this.carritoService.subtotal;
  }
 
  get totalItems(): number {
    return this.carritoService.totalItems;
  }
 
  // ─── Acciones ─────────────────────────────────────────────────────────────
 
  cambiarCantidad(index: number, delta: number) {
    this.carritoService.cambiarCantidad(index, delta);
  }
 
  eliminarItem(index: number) {
    this.carritoService.eliminar(index);
  }
 
  async confirmarVaciar() {
    const alert = await this.alertCtrl.create({
      header: 'Vaciar carrito',
      message: '¿Estás seguro de que quieres eliminar todos los productos?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Vaciar',
          role: 'destructive',
          handler: () => this.carritoService.vaciar()
        }
      ]
    });
    await alert.present();
  }
 
  // ─── Variaciones helpers ──────────────────────────────────────────────────
 
  tieneVariaciones(item: ItemCarrito): boolean {
    return Object.keys(item.variaciones).length > 0;
  }
 
  getVariaciones(item: ItemCarrito): string[] {
    return Object.entries(item.variaciones).map(([k, v]) => `${k}: ${v}`);
  }
 
  // ─── Checkout en WooCommerce ──────────────────────────────────────────────
  //
  // Redirige al navegador del dispositivo con los productos en el carrito.
  // WooCommerce necesita el plugin "CartFlows" o el parámetro ?fill_cart
  // para pre-llenar el carrito. Si no tienes un plugin, la alternativa
  // más simple es redirigir directo a /checkout y dejar que el usuario
  // complete la compra en el sitio web.
 
  irACheckout() {
    const url = this.carritoService.buildCheckoutUrl(environment.wooBaseUrl);
    window.open(url, '_blank');
  }

}
