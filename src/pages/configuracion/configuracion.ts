import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { DataEventoServiceProvider } from '../../providers/data-evento-service/data-evento-service';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  nombreEvento: any = '';
  logoEvento: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public dataEvento: DataEventoServiceProvider) {
  }

  ionViewDidLoad() {

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

  guardar(){
    this.dataEvento.setNombreEvento(this.nombreEvento);
    this.dataEvento.setLogoEvento(this.logoEvento);
    this.navCtrl.pop();
  }

}
