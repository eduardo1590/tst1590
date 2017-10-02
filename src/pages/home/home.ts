import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TotemCorporativosPage } from '../totem-corporativos/totem-corporativos';
import { TotemEventosPage } from '../totem-eventos/totem-eventos';
import { InfoEventoPage } from '../info-evento/info-evento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

  }
  
  goToEventos(){
    this.navCtrl.push(TotemEventosPage);
  }

  goToCorporativos(){
    this.navCtrl.push(TotemCorporativosPage);
  }

  modalInfoEvento(tipo){
    let modal = this.modalCtrl.create(InfoEventoPage, {tipo: tipo});
    modal.present();
  }

}
