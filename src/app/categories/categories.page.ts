import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ResponseInterface } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public Categorias: any[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    

  }

}
