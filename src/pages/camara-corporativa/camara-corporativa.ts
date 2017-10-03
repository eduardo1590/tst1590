import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { CompartirCorporativoPage } from '../compartir-corporativo/compartir-corporativo';
import { CompartirEventosPage } from '../compartir-eventos/compartir-eventos';

import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { File } from '@ionic-native/file';
declare var cordova: any; // global variable for paths

/**
 * Generated class for the CamaraCorporativaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-camara-corporativa',
  templateUrl: 'camara-corporativa.html',
})
export class CamaraCorporativaPage {

  picture:string;
  tipoEvento: number;
  nombreEvento: string;

  constructor(private diagnostic: Diagnostic,
            public navCtrl: NavController,
            public navParams: NavParams, 
            public toastCtrl: ToastController,
            public cameraPreview: CameraPreview,
            public file: File) {
    /*this.tipoEvento = this.navParams.get("tipo");
    this.nombreEvento = this.navParams.get("nombreEvento");*/
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
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
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

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      //this.moveFileToExternalStorage(this.picture);
      //al guardarla debo colocarle el nombre del evento
      this.cameraPreview.stopCamera();
      if (this.tipoEvento == 1)
        this.navCtrl.push(CompartirCorporativoPage, {image: this.picture, nombreEvento:this.nombreEvento});
      else
        this.navCtrl.push(CompartirEventosPage, {image: this.picture, nombreEvento:this.nombreEvento});
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

}
