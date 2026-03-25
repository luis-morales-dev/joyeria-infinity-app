import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  //Arreglo para la lista de productos del carrito
  public selectedItems: any [] = [];
  subtotal =0;
  total = 0;
  msg_cart = '';
  is_empty = true;

  constructor(private router:Router, private carrito:CarritoService) { }

  ngOnInit() {
    let Items = this.carrito.getCart();
    let selected: any = {};

    //console.log(Items.length);
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
    }

   
  }

  remove(){
    this.carrito.removeCart();
    this.router.navigate(['/home']);
  }

}
