import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { TotemEventosPage } from '../pages/totem-eventos/totem-eventos';
import { TotemCorporativosPage } from '../pages/totem-corporativos/totem-corporativos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;
  
    menuPages: any[] = [
      {
        title: 'Totem',
        icon: 'star',
        component: HomePage,
        tabIndex: 0
      },
      {
        title: 'Configuracion',
        icon: 'settings',
        component: ConfiguracionPage,
        tabIndex: 1
      },
      {
        title: 'Eventos',
        icon: 'musical-note',
        component: TotemEventosPage,
        tabIndex: 0
      },
      {
        title: 'Corporativos',
        icon: 'people',
        component: TotemCorporativosPage,
        tabIndex: 1
      },
    ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  
  openPage(page){
    this.nav.setRoot( page.component, {
      tabIndex: page.tabIndex
    });
  }

}

