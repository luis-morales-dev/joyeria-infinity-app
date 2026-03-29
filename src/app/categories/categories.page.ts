import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ResponseInterface, WooCategoria } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categorias: any[] = [];
  isLoading = true;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.cargarCategorias();    

  }

  cargarCategorias() {
    this.isLoading = true;
 
    this.data.getCategorias().subscribe({
      next: (data:any) => {
        this.categorias = data;
        this.isLoading  = false;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.isLoading = false;
      }
    });
  }

}
