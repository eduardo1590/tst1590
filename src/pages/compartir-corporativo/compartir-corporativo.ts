import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { TotemCorporativosPage } from '../totem-corporativos/totem-corporativos';

/**
 * Generated class for the CompartirCorporativoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-compartir-corporativo',
  templateUrl: 'compartir-corporativo.html',
})
export class CompartirCorporativoPage {
  image: string;
  nombreEvento: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, private printer: Printer) {
    this.image = navParams.get('image');
    this.nombreEvento = this.navParams.get("nombreEvento");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompartirCorporativoPage');
  }

  sharingWhatsapp(){
    let picture = this.image;
    let message = "Totem's Star: " + this.nombreEvento;
    let url = "www.eduardo1590.esy.es";
    this.socialSharing.shareViaWhatsApp(message, picture, url);
  }

  directWhatsApp(){
    let receiver = "";
    let picture = this.image;
    let message = "Enviado desde Totem's Star App en " + this.nombreEvento;
    let url = "www.eduardo1590.esy.es";
    this.socialSharing.shareViaWhatsAppToReceiver(receiver, message, picture, url);
  }

  sharingMail(){
    let picture = this.image;
    let message = "Enviado desde Totem's Star App en " + this.nombreEvento;
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

  sharingTwitter(){
    let picture = this.image;
    let message = "Enviado desde Totem's Star App en " + this.nombreEvento;
    let url = "www.eduardo1590.esy.es";
    this.socialSharing.shareViaTwitter(message, picture, url);
  }

  sharingInstagram(){
    let picture = this.image;
    let message = "Enviado desde Totem's Star App en " + this.nombreEvento;
    this.socialSharing.shareViaInstagram(message, picture);
  }

  sharingFacebook(){
    let picture = this.image;
    let message = "Totem's Star";
    let url = "www.eduardo1590.esy.es";
    this.socialSharing.shareViaFacebook(message, picture, url);
  }

  goHome(){
    this.navCtrl.setRoot(TotemCorporativosPage, {nombreEvento:this.nombreEvento});
  }

}
