export interface ResponseInterface{
    status:string;
    code:any;
    token: any;
    message:any;
    data:any;
    result:any;
    categorias:any;
    documentos:any;
    cliente: any;
    estados: any;
    municipios:any;
    productos: any;
    anuncios:any;
    detail: any;
    direcciones: any;
    direccion: any;
    rows: any;
    total: any;
    membresias:any;
    ordenes:any;

}

export interface WooCategoria {
  id: any;
  name: any;
  slug: any;
  count: any;          // número de productos en esa categoría
  image: {
    src: any;
  } | null;
}

export interface WooImagen {
  id: any;
  src: any;
  alt: any;
}

export interface WooProducto {
  id: any;
  name: any;
  price: any;
  regular_price: any;
  sale_price: any;
  on_sale: boolean;
  images: WooImagen[];
  categories: { id: any; name: any }[];
  stock_status: 'instock' | 'outofstock';
  attributes: {
     id: number;
     name: string;
     options: string[];
   }[];
   description: string;
   short_description: string;
}