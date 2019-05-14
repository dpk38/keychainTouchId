import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message1: string;
  message2: string;
  message3: string;
  message4: string;
  message5: string;

  constructor(
    public navCtrl: NavController,
    private keychainTouchId: KeychainTouchId,
    public platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.keychainTouchId.isAvailable()
      .then((biometryType) => {
        this.message1 = 'Biometry available: ' + biometryType;
      })
      .catch((error: any) => {
        this.message1 = 'Error: ' + error;
      });
    });
  }

  save() {
    (<any>window).plugins.touchid.save('user', 'this_is_your_top_secret_password', false, (res: any) => {
      this.message2 = 'Response: ' + res;
    }, (error: any) => {
      this.message1 = 'Error: ' + error;
    });
    // this.keychainTouchId.save('user', 'this_is_your_top_secret_password')
    // .then((res: any) => {
    //   this.message2 = 'Response: ' + res;
    // })
    // .catch((error: any)=> {
    //   this.message2 = 'Error: ' + error;
    // });
  }
  
  verify() {
    this.keychainTouchId.verify('user', 'Plis place finger here')
    .then((res: any) => {
      this.message3 = 'Response: ' + res;
    })
    .catch((error: any)=> {
      this.message3 = 'Error: ' + error;
    });
  }

  delete() {
    this.keychainTouchId.delete('user')
    .then((res: any) => {
      this.message4 = 'Response: ' + res;
    })
    .catch((error: any)=> {
      this.message4 = 'Error: ' + error;
    });
  }

  check() {
    this.keychainTouchId.has('user')
    .then((res: any) => {
      this.message5 = 'Response: ' + res;
    })
    .catch((error: any)=> {
      this.message5 = 'Error: ' + error;
    });
  }
  
}
