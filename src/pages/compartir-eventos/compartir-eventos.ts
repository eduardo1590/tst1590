import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { TotemEventosPage } from '../totem-eventos/totem-eventos';

/**
 * Generated class for the CompartirEventosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-compartir-eventos',
  templateUrl: 'compartir-eventos.html',
})
export class CompartirEventosPage {

  image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, private printer: Printer) {
    this.image = navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompartirEventosPage');
  }

   sharingWhatsapp(){
    let picture = this.image;
    let message = "Totem's Star";
    let url = "www.eduardo1590.esy.es";
    this.socialSharing.shareViaWhatsApp(message, picture, url);
  }

  sharingMail(){
    let picture = this.image;
    let message = "Enviado desde Totem's Star App";
    this.socialSharing.shareViaEmail(message, "Totem's Star", [""], [""], [""], picture);
  } 

   print(){
    this.printer.isAvailable().then( ()=>{
      let options: PrintOptions = {
        name: 'TotemFoto',
        duplex: false,
        landscape: true
      };
      this.printer.print(this.image, options).then( ()=>{
            alert("Listo!");
            },()=>{
            alert("Error imprimiendo!");
            });
    }, ()=>{
        alert('Error : impresora no disponible ');
        });
  }

  goHome(){
    this.navCtrl.setRoot(TotemEventosPage);
  }
}
