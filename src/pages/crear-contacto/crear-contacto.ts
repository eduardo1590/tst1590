import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the CrearContactoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-crear-contacto',
  templateUrl: 'crear-contacto.html',
})
export class CrearContactoPage {
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public contacto: Contacts, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearContactoPage');
  }

  saveData(){
    let name = this.myForm.value['name'];
    let phone = this.myForm.value['phone'];
    this.crearContacto(name, phone);
  }

  crearContacto(name, phone){
    let contact: Contact = this.contacto.create();
    contact.name = new ContactName(null, name);
    contact.phoneNumbers = [new ContactField('mobile', phone)];
    contact.save().then(
      () => { 
        console.log('Contacto Guardado!', contact)
        this.dismiss({estado:true,contacto:contact});
      },
      (error: any) => {
        console.error('Error al guardar el contacto.', error)
        this.dismiss({estado:false});
      }
    );
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
