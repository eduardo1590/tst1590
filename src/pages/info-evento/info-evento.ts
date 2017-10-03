import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TotemCorporativosPage } from '../totem-corporativos/totem-corporativos';
import { TotemEventosPage } from '../totem-eventos/totem-eventos';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the InfoEventoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-evento',
  templateUrl: 'info-evento.html',
})
export class InfoEventoPage {

  myForm: FormGroup;
  nombreEvento: string;
  tipoEvento: number;
  logo: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private fb: FormBuilder,
              public camera: Camera) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      logo: ['true',]
    });
    this.tipoEvento = this.navParams.get("tipo");
    console.log(this.tipoEvento);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoEventoPage');
  }

  saveData(opcion){
    this.nombreEvento = this.myForm.value['name'];
    this.dismiss({estado:true,mensaje:"Exitoso"});
    if (this.myForm.value['logo'] == 'true'){
      this.seleccionarImagen();
    }
    if (this.tipoEvento == 1){
      this.navCtrl.push(TotemEventosPage, {nombreEvento: this.nombreEvento, logo: this.logo});
    }else{
      this.navCtrl.push(TotemCorporativosPage, {nombreEvento: this.nombreEvento, logo: this.logo});
    }
    
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  seleccionarImagen(){
    let options = {
      destinationType   : this.camera.DestinationType.DATA_URL,
      sourceType        : this.camera.PictureSourceType.PHOTOLIBRARY
    };
  
    this.camera.getPicture(options)
      .then(data  => {
        this.logo = "data:image/jpeg;base64," + data;
      }).catch(error =>{
        console.error( error );
      });
  }
}
