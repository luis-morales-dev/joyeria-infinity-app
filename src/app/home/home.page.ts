import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';


import { ResponseInterface, WooCategoria, WooProducto, WooImagen } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //Variable para mostrar el total de productos a mostrar
  total_prod = 0;

   //Variables para hacer la busqueda
   search_term = '';

  public categories: any[] = [];
  public featuredProducts: any[] = [];
  public bestSellProducts: any[] = [];


  //Variables para mostrar las categorias de la tienda
  public categorias: any[] = [];
  public categoriaActiva: number | null = null;
  public isLoadingCategorias = true;
  public productos: any[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    //this.categories = this.data.getCategories();
    //this.featuredProducts = this.data.getFeaturedProducts();
    //this.bestSellProducts = this.data.getBestSellProducts();

    this.cargarCategorias();
    this.cargarProductos();

  }

  cargarCategorias() {
    this.data.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data;
        console.log(this.categorias);
        this.isLoadingCategorias = false;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.isLoadingCategorias = false;
      }
    });
  }

  cargarProductos() {
    this.data.getProductos().subscribe({
      next: (data: any) => {
        this.productos = data;
        console.log(this.productos);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  /*
  cargarProductosPorCategoria(categoriaId: number) {
    this.categoriaActiva = categoriaId;
    this.data.getCategoriaId({ id: categoriaId }).subscribe({
      next: (data: any) => {
        this.productos = data;
        console.log(this.productos);
      },
      error: (err) => {
        console.error('Error al cargar productos por categoría:', err);
      }
    });
  }*/

    agregarAlCarrito(){}

}
