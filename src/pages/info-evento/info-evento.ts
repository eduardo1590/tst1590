import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TotemCorporativosPage } from '../totem-corporativos/totem-corporativos';
import { TotemEventosPage } from '../totem-eventos/totem-eventos';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]]
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
    if (this.tipoEvento == 1){
      this.navCtrl.push(TotemEventosPage, {nombreEvento: this.nombreEvento});
    }else{
      this.navCtrl.push(TotemCorporativosPage, {nombreEvento: this.nombreEvento});
    }
    
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}
