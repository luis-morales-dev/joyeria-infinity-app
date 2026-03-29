import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseInterface, WooCategoria, WooProducto } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categoriaId: number      = 0;
  categoriaNombre: string  = '';
  productos: any[] = [];
 
  isLoading    = true;
  isLoadingMore = false;
  hayMas       = false;
  cartCount    = 0;
 
  // Paginación
  private paginaActual = 1;
  private porPagina    = 10;

  //Inicializamos nuestro arreglo para las peticiones
  public cat_id = {
    categoria_id: ''
  }

  //Variable para mostrar el total de productos a mostrar
  total_prod = 0;

  //url_img = '';
  msg_cat ='';

  //Arreglo para las categorias
  public Categorias: any [] = [];

  public Productos: any[] = [];


  constructor(private data: DataService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //capturamos el id de la categoria
    //let catId:any = this.activatedroute.snapshot.paramMap.get('id');
    //console.log(catId);

    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));

    // Intentar obtener el nombre desde el estado de navegación
    // (pasado opcionalmente desde categories.page)
    const nav = history.state;
    if (nav?.nombre) {
      this.categoriaNombre = nav.nombre;
    }
 
    if (this.categoriaId) {
      this.cargarProductos();
    }
    
  }

  cargarProductos() {
    this.isLoading   = true;
    this.paginaActual = 1;
 
    this.data.getProductosPorCategoria(this.categoriaId, this.paginaActual, this.porPagina)
      .subscribe({
        next: (data:any) => {
          this.productos = data;
          this.hayMas    = data.length === this.porPagina;
          this.isLoading = false;
        },
        error: (err:any) => {
          console.error('Error al cargar productos:', err);
          this.isLoading = false;
        }
      });
  }

  // ─── Cargar más (paginación) ──────────────────────────────────────────────
 
  cargarMas() {
    if (this.isLoadingMore) return;
    this.isLoadingMore = true;
    this.paginaActual++;
 
    this.data.getProductosPorCategoria(this.categoriaId, this.paginaActual, this.porPagina)
      .subscribe({
        next: (data:any) => {
          this.productos     = [...this.productos, ...data];
          this.hayMas        = data.length === this.porPagina;
          this.isLoadingMore = false;
        },
        error: (err:any) => {
          console.error('Error al cargar más:', err);
          this.isLoadingMore = false;
          this.paginaActual--;  // revertir si falla
        }
      });
  }

  agregarAlCarrito(event: Event, producto: WooProducto){
    event.stopPropagation();
    this.cartCount++;
    // this.carritoService.agregar(producto);
  }

}
