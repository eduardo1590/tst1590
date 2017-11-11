import { Injectable } from '@angular/core';

@Injectable()
export class DataEventoServiceProvider {

  nombreEvento: any;
  logoEvento: any;

  constructor() {
    console.log('Hello DataEventoServiceProvider Provider');
  }

  setNombreEvento(nombre: any){
    this.nombreEvento = nombre;
  }

  setLogoEvento(logo: any){
    this.logoEvento = logo;
  }

  getNombreEvento(){
    return this.nombreEvento;
  }

  getLogoEvento(){
    return this.logoEvento;
  }
}
