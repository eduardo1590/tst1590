import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  nombreEvento: string = '';
  logoEvento: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

  seleccionarLogo(){
    let options = {
      destinationType   : this.camera.DestinationType.DATA_URL,
      sourceType        : this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options)
    .then(data =>{
      this.logoEvento = "data:image/jpeg;base64," + data;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
