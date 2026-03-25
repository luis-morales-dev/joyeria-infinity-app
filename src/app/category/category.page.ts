import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseInterface } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

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


  constructor(private data: DataService, public activatedroute: ActivatedRoute) { }

  ngOnInit() {
    //capturamos el id de la categoria
    let catId:any = this.activatedroute.snapshot.paramMap.get('id');
    //console.log(catId);
    
  }

}
