import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SplashScreen } from '@capacitor/splash-screen'; 
//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StatusBar } from '@capacitor/status-bar';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
  ) {
    this.initializeApp();
    }

    initializeApp() {
      this.platform.ready().then(() => {
        //this.statusBar.styleDefault();
        //this.splashScreen.hide();
        //await SplashScreen.hide();
      });
    }

    ngOnInit() {
      this.selectedIndex = 1;
      
      this.util.getMenuState().subscribe(menuState => {
        this.isMenuEnabled = menuState;
      });
    }
  
    navigate(path:any, selectedId:any) {
      this.selectedIndex = selectedId;
      this.router.navigate([path]);
    }
  
    close() {
      menuController.toggle();
    }  
}
