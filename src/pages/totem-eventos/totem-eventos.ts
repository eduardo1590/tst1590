import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
//import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
//import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CrearContactoPage } from '../crear-contacto/crear-contacto';
import { CamaraCorporativaPage } from '../camara-corporativa/camara-corporativa';
import { CompartirEventosPage } from '../compartir-eventos/compartir-eventos';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the TotemEventosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-totem-eventos',
  templateUrl: 'totem-eventos.html',
})
export class TotemEventosPage {
  image: string = null;
  nombreEvento: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private camera: Camera) {
    this.nombreEvento = this.navParams.get("nombreEvento");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TotemEventosPage');
  }

  getPicture(tipo: number){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      allowEdit: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.navCtrl.push(CompartirEventosPage, {image: this.image});
    })
    .catch(error =>{
      console.error( error );
    });
  }

  modalNuevoContacto(){
    let modal = this.modalCtrl.create(CrearContactoPage);
    modal.present();
  }

  goToCamaraCorporativa(){
    this.navCtrl.push(CamaraCorporativaPage, {tipo: 2, nombreEvento:this.nombreEvento});
  }

}
