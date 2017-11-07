import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { DataEventoServiceProvider } from '../../providers/data-evento-service/data-evento-service';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  nombreEvento: any = '';
  logoEvento: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public camera: Camera, public dataEvento: DataEventoServiceProvider,
              public toastCtrl: ToastController) {
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
    this.presentToast();
    this.navCtrl.pop();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Se han guardado los datos del Evento!',
      duration: 3000
    });
    toast.present();
  }

}
