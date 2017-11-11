import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { CrearContactoPage } from '../crear-contacto/crear-contacto';
import { CamaraCorporativaPage } from '../camara-corporativa/camara-corporativa';
import { CompartirEventosPage } from '../compartir-eventos/compartir-eventos';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-totem-eventos',
  templateUrl: 'totem-eventos.html',
})
export class TotemEventosPage {
  image: string = null;
  mensaje = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private modalCtrl: ModalController, private camera: Camera,
              public loadingCtrl: LoadingController) {

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
    this.navCtrl.push(CamaraCorporativaPage, {tipo: 2});
  }

}
