import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { DataService } from '../data.service';
import { CarritoService, ItemCarrito } from '../carrito.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseInterface, WooCategoria, WooProducto, WooImagen } from 'src/app/modelos/response.interface';

import { AlertController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';

// Interfaz para manejar variaciones de forma flexible
interface VariacionOpcion {
  label: string;
  value: string; // para colores: hex | rgb, para texto: igual que label
}
 
interface Variacion {
  name: string;
  type: 'color' | 'text';
  options: VariacionOpcion[];
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  swiperModules = [IonicSlides];

  producto: WooProducto | null = null;
  variaciones: Variacion[] = [];
  selecciones: Record<string, string> = {};  // { 'Talla': 'M', 'Color': 'Rojo' }

  isLoading    = true;
  cantidad     = 1;
  activeSlide  = 0;
  descExpanded = false;
  cartCount    = 0;
 
  swiperOpts = {
    slidesPerView: 1,
    grabCursor: true,
    loop: false,
  };

  

  constructor(private animatioCntrl: AnimationController,
             public route: ActivatedRoute, 
             private data: DataService, 
             private carrito:CarritoService, 
             private router:Router,
             private alertController: AlertController) { }

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarProducto(id);
    }
  }

  // ─── Carga del producto ──────────────────────────────────────────────────
 
  cargarProducto(id: number) {
    this.isLoading = true;
 
    this.data.getProductoById(id).subscribe({
      next: (producto:any) => {
        this.producto  = producto;
        this.variaciones = this.parsearVariaciones(producto);
        this.isLoading = false;
        console.log('Producto cargado:', producto);
      },
      error: (err:any) => {
        console.error('Error al cargar producto:', err);
        this.isLoading = false;
      }
    });
  }

  // ─── Parsear atributos de WooCommerce a variaciones ──────────────────────
  //
  // WooCommerce devuelve los atributos así:
  // attributes: [
  //   { name: 'Color', options: ['Rojo', 'Azul', 'Negro'] },
  //   { name: 'Talla', options: ['S', 'M', 'L', 'XL'] }
  // ]
  //
  // Los detectamos como "color" si el nombre incluye 'color' o 'colour'.
 
  parsearVariaciones(producto: WooProducto): Variacion[] {
    if (!producto.attributes || producto.attributes.length === 0) return [];
 
    return producto.attributes.map((attr: any) => {
      const esColor = /colou?r/i.test(attr.name);
 
      return {
        name: attr.name,
        type: esColor ? 'color' : 'text',
        options: attr.options.map((op: string) => ({
          label: op,
          value: esColor ? this.colorNombreAHex(op) : op,
        }))
      };
    });
  }

  // Convierte nombres de colores comunes a hex para los chips visuales.
  // Amplía este mapa según los colores de tu tienda.
  colorNombreAHex(nombre: string): string {
    const mapa: Record<string, string> = {
      rojo: '#E24B4A', red: '#E24B4A',
      azul: '#378ADD', blue: '#378ADD',
      negro: '#2C2C2A', black: '#2C2C2A',
      blanco: '#F1EFE8', white: '#F1EFE8',
      verde: '#639922', green: '#639922',
      amarillo: '#EF9F27', yellow: '#EF9F27',
      gris: '#888780', gray: '#888780', grey: '#888780',
      rosa: '#D4537E', pink: '#D4537E',
      morado: '#7F77DD', purple: '#7F77DD',
      naranja: '#D85A30', orange: '#D85A30',
    };
    return mapa[nombre.toLowerCase()] ?? '#D3D1C7';
  }
 
  // ─── Variaciones ─────────────────────────────────────────────────────────
 
  seleccionarVariacion(nombre: string, valor: string) {
    this.selecciones = { ...this.selecciones, [nombre]: valor };
  }
 
  // ─── Cantidad ────────────────────────────────────────────────────────────
 
  cambiarCantidad(delta: number) {
    const nueva = this.cantidad + delta;
    if (nueva >= 1) this.cantidad = nueva;
  }
 
  // ─── Total calculado ─────────────────────────────────────────────────────
 
  get totalPrecio(): string {
    if (!this.producto) return '0';
    const precio = parseFloat(this.producto.price) || 0;
    return (precio * this.cantidad).toFixed(2);
  }
 
  // ─── Galería ─────────────────────────────────────────────────────────────
 
  onSlideChange(event: any) {
    this.activeSlide = event.detail[0].activeIndex ?? 0;
  }

  agregarAlCarrito() {
    if (!this.producto) return;
 
    const item = {
      producto: this.producto,
      cantidad: this.cantidad,
      variaciones: this.selecciones,
    };
 
    // Aquí conecta tu servicio de carrito:
    this.carrito.agregar(item.producto, item.cantidad, item.variaciones);
 
    console.log('Agregado al carrito:', item);
    this.cartCount++;
  }


}
