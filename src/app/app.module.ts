import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TotemCorporativosPage } from '../pages/totem-corporativos/totem-corporativos';
import { TotemEventosPage } from '../pages/totem-eventos/totem-eventos';
import { CrearContactoPage } from '../pages/crear-contacto/crear-contacto';
import { CamaraCorporativaPage } from '../pages/camara-corporativa/camara-corporativa'
import { CompartirCorporativoPage } from '../pages/compartir-corporativo/compartir-corporativo';
import { CompartirEventosPage } from '../pages/compartir-eventos/compartir-eventos';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';

import { Camera } from '@ionic-native/camera';
import { Contacts } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Printer } from '@ionic-native/printer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
import { EduTransparentDirective } from '../directives/edu-transparent/edu-transparent';
import { DataEventoServiceProvider } from '../providers/data-evento-service/data-evento-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TotemEventosPage,
    TotemCorporativosPage,
    CrearContactoPage,
    CamaraCorporativaPage,
    CompartirEventosPage,
    CompartirCorporativoPage,
    ConfiguracionPage,
    EduTransparentDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TotemEventosPage,
    TotemCorporativosPage,
    CamaraCorporativaPage,
    CompartirEventosPage,
    CompartirCorporativoPage,
    ConfiguracionPage,
    CrearContactoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Contacts,
    SocialSharing,
    Printer,
    CameraPreview,
    File,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataEventoServiceProvider
  ]
})
export class AppModule {}
