import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CompartirCorporativoPage } from '../compartir-corporativo/compartir-corporativo';
import { CompartirEventosPage } from '../compartir-eventos/compartir-eventos';

import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';
import { DataEventoServiceProvider } from '../../providers/data-evento-service/data-evento-service';
import { File } from '@ionic-native/file';
declare var cordova: any; // global variable for paths

@Component({
  selector: 'page-camara-corporativa',
  templateUrl: 'camara-corporativa.html',
})
export class CamaraCorporativaPage {

  picture: string;
  tipoEvento: number;
  nombreEvento: any;
  logoEvento: any;
  mensaje: string = '';

  constructor(private diagnostic: Diagnostic,
            public navCtrl: NavController,
            public navParams: NavParams, 
            public toastCtrl: ToastController,
            public loadingCtrl: LoadingController,
            public cameraPreview: CameraPreview,
            public datosEvento: DataEventoServiceProvider,
            public file: File) {
    this.tipoEvento = this.navParams.get("tipo");
    this.nombreEvento = this.datosEvento.getNombreEvento();
    this.logoEvento = this.datosEvento.getLogoEvento();
    this.checkPermissions();
}
 
checkPermissions() {
    this.diagnostic.isCameraAuthorized().then((authorized) => {
    if(authorized)
        this.initializePreview();
    else {
        this.diagnostic.requestCameraAuthorization().then((status) => {
            if(status == this.diagnostic.permissionStatus.GRANTED)
                this.initializePreview();
            else {
                // Permissions not granted
                // Therefore, create and present toast
                this.toastCtrl.create(
                    {
                        message: "Cannot access camera", 
                        position: "bottom",
                        duration: 5000
                    }
                ).present();
            }
        });
    }
});
}

  initializePreview(){
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 56,
      width: window.screen.width,
      height: 320,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: false,
      alpha: 1
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  takePicture(){
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 100
    }

    this.contador();

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      //this.moveFileToExternalStorage(this.picture);
      this.cameraPreview.stopCamera();
      if (this.tipoEvento == 1)
        this.navCtrl.push(CompartirCorporativoPage, {image: this.picture, nombre: this.nombreEvento, logo: this.logoEvento});
      else
        this.navCtrl.push(CompartirEventosPage, {image: this.picture, nombre: this.nombreEvento, logo: this.logoEvento});
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

  }

  changeEffect() {
    // Create an array with 5 effects
    let effects: any = ['none', 'aqua', 'blackboard', 'mono', 'negative','posterize', 'sepia', 'solarize', 'whiteboard'];
 
    let randomEffect: string = effects[Math.floor(
                                Math.random() * effects.length)];
    this.cameraPreview.setColorEffect(randomEffect);
  }

  moveFileToExternalStorage(fileName: string) {
    // Determine paths
    let externalStoragePath: string = 
                cordova.file.externalApplicationStorageDirectory;
    let currentPath: string = 
                cordova.file.applicationStorageDirectory + "files/";
 
    // Extract filename
    fileName = fileName.split("/").pop();
 
    // Move the file
    this.file.moveFile(currentPath, fileName,
                  externalStoragePath, fileName).then(_ => {
        this.toastCtrl.create(
            {
                message: "Guardada", 
                position: "bottom",
                duration: 2000
            }
        ).present();
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamaraCorporativaPage');
  }

  contador() {
    this.mensaje = "5 PREPARATE!";
    this.presentLoading(this.mensaje);
    setTimeout(() => {
      this.mensaje = "4 ABRACENSE";
      this.presentLoading(this.mensaje);
      setTimeout(() => {
        this.mensaje = "3 BESOS";
        this.presentLoading(this.mensaje);
        setTimeout(() => {
          this.mensaje = "2 SONRIE";
          this.presentLoading(this.mensaje);
          setTimeout(() => {
            this.mensaje = "1 TOTEM'S STAR";
            this.presentLoading(this.mensaje);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  presentLoading(msg) {
    let loader = this.loadingCtrl.create({
      content: msg,
      duration: 1000
    });
    loader.present();
  }

}
