import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'

import { ResponseInterface, WooProducto, WooImagen } from 'src/app/modelos/response.interface';

const url_api = environment.api_url;

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //Datos tienda Woocommerce
  //private baseUrl = 'https://joyeriainfinity.com.mx/wp-json/wc/v3';
  private baseUrl = environment.api_url;
  private ck = 'ck_bb124a88cccba82056e500e989ece6bf8982431f';
  private cs = 'cs_b61e132fd94845c9dc2df7e3ceaae347764b40f3';

  constructor(private http:HttpClient) { }

  //Header para las paeticiones al backend
  /*
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  })

  getCategorias():Observable<ResponseInterface>{
    return this.http.get<ResponseInterface>(`${url_api}categoria/get-categorias-market-place`);
  }

  getCategoriaId(id:Object):Observable<ResponseInterface>{
    return this.http.post<ResponseInterface>(`${url_api}producto/get-productos-market-place`, id);
  }

  getProductoLimit(id:Object):Observable<ResponseInterface>{
    return this.http.post<ResponseInterface>(`${url_api}producto/get-productos-market-place`, id);
  }

  getTodosProductos():Observable<ResponseInterface>{
    return this.http.get<ResponseInterface>(`${url_api}producto/get-productos-market-place`);
  }

  getProductoId(id:Object):Observable<ResponseInterface>{
    return this.http.post<ResponseInterface>(`${url_api}producto/get-producto-detail-market-place`, id);
  }*/


  private getParams() {
    return new HttpParams()
      .set('consumer_key', this.ck)
      .set('consumer_secret', this.cs);
  }

  getProductos() {
    return this.http.get(`${this.baseUrl}/products`, { params: this.getParams() });
  }

  getCategorias() {
    return this.http.get(`${this.baseUrl}/products/categories`, { params: this.getParams() });
  }

  getOrdenes() {
    return this.http.get(`${this.baseUrl}/orders`, { params: this.getParams() });
  }

  getProductoById(id: number): Observable<WooProducto> {
    return this.http.get<WooProducto>(
      `${this.baseUrl}/products/${id}`,
      { params: this.getParams() }
    );
  }

  /*getProductos(params?: Record<string, string>): Observable<WooProducto[]> {
  return this.http.get<WooProducto[]>(`${this.baseUrl}/products`, {
    params: this.getParams({
      per_page: '10',
      status: 'publish',
      stock_status: 'instock',
      ...params
    })
  });
  }

getProductosRecientes(): Observable<WooProducto[]> {
  return this.getProductos({
    orderby: 'date',
    order: 'desc',
    per_page: '10'
  });
}

getProductosDestacados(): Observable<WooProducto[]> {
  return this.getProductos({
    featured: 'true',
    per_page: '10'
  });
}
*/


  
  /*
  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Bebidas',
      image: '../../assets/categories/category-1.png'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Almuezos',
      image: '../../assets/categories/category-2.png'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Postre',
      image: '../../assets/categories/category-3.png'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Leche Santa Clara',
      price: 55,
      image: '../../assets/products/prod-1.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Coca 355ml',
      price: 34,
      image: '../../assets/products/prod-2.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Sandwich Lonchibon',
      price: 40,
      image: '../../assets/products/prod-3.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Pizza Pepperoni',
      price: 55,
      image: '../../assets/products/prod-4.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Jugo del Valle 355ml',
      price: 34,
      image: '../../assets/products/prod-5.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Bimkingo Lonchibon',
      price: 40,
      image: '../../assets/products/prod-6.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
  */
}