import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  //Arreglo para la lista de productos del carrito
  public selectedItems: any [] = [];
  subtotal =0;
  total = 0;

  constructor(private router:Router, private carrito:CarritoService) { }

  ngOnInit() {
    /*
    let Items = this.carrito.getCart();
    let selected: any = {};
    
      for(let obj of Items){
        selected[obj.id] = {...obj, count: 1}
      }
  
      this.selectedItems = Object.keys(selected).map(key => selected[key])
      console.log('items: ', this.selectedItems);
      this.total = this.selectedItems.reduce((a, b) => a + (b.quantity * b.price), 0);*/
  }

}
