import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TotemCorporativosPage } from '../totem-corporativos/totem-corporativos';
import { TotemEventosPage } from '../totem-eventos/totem-eventos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  goToEventos(){
    this.navCtrl.push(TotemEventosPage);
  }

  goToCorporativos(){
    this.navCtrl.push(TotemCorporativosPage);
  }

}
