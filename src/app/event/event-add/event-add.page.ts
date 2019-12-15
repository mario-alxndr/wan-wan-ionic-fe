import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { MapModalComponent } from './map-modal/map-modal.component';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.page.html',
  styleUrls: ['./event-add.page.scss'],
})
export class EventAddPage implements OnInit {

  private username;
  private eventType;
  private eventTag;
  private eventSite;
  private latitude = 100;
  private longitude = 200;
  private address = "";
  private pickedLocation = false;
  private fileLocation = "";
  private kbytes;

  constructor(
    private storage: Storage,
    private loginSrvc: LoginService,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private base64: Base64,
    private fileChooser: FileChooser,
    private filePath: FilePath,
  ) { 
    
  }

  ngOnInit() {
    this.storage.get(TOKEN_USERNAME).then(userObject => {
      this.username = userObject
    });
    return new Promise(() => {
      setTimeout(() => {
        if(!this.loginSrvc.userIsLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      }, 2000);
    })
  }

  async presentAlert(success, stringNotification) {
    const alertFailed = await this.alertController.create({
      header: 'Error',
      message: stringNotification,
      buttons: ['OK']
    });
    const alertSuccess = await this.alertController.create({
      header: 'Success',
      message: stringNotification,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('event/event-home');
          }
        }
      ]
    });
    if(success) { await alertSuccess.present(); }
    else { await alertFailed.present(); }
  }

  async onPickLocation() {
    const modal = await this.modalController.create({
      component: MapModalComponent
    });
    modal.onDidDismiss().then((modalData) => {
      this.latitude = modalData.data.lat;
      this.longitude = modalData.data.lng;
      this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(
        (address) => {
          this.address = address;
        }
      )
    });
    return await modal.present();
  }

  private getAddress(lat: number, lng: number) {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsAPIKey}`)
    .pipe(
      map(geoData => {
        if(!geoData || !geoData.results || !geoData.results.length) {
          return null;
        }
        this.pickedLocation = true;
        return geoData.results[0].formatted_address;
      })
    )
  }

  onAddEvent(form) {
    var stringNotification = "";
    var eventGames: string[];
    var eventCategory: string[];
    var success = false;
    var counter = 0;

    if(!form.value.eventName || 
       !form.value.eventType || 
       !form.value.eventGames || 
       !form.value.description || 
       !form.value.startDate || 
       !form.value.endDate || 
       !form.value.startTime || 
       !form.value.eventTag || 
       !form.value.eventSite) {
        stringNotification += "Please enter ";
        if(!form.value.eventName) {
        stringNotification += "event name";
        counter++;
        }
        if(!form.value.eventType) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "event type";
        counter++;
        }
        if(!form.value.eventGames) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "event games";
        counter++;
        }
        if(!form.value.description) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "description";
        counter++;
        }
        if(!form.value.startDate) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "start date";
        counter++;
        }
        if(!form.value.endDate) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "end date";
        counter++;
        }
        if(!form.value.startTime) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "start time";
        counter++;
        }
        if(!form.value.eventTag) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "event tag";
        counter++;
        }
        if(!form.value.eventSite) {
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "event site";
        counter++;
        }
    }
    else if(form.value.eventSite == "Onsite" && !this.pickedLocation) {
      stringNotification = "Please enter event location";
    }
    else if(this.fileLocation == ""){
      stringNotification = "Please input event poster";
    }
    
    else {
      // console.log("objek form", form.value);
      // console.log("username", this.username);
      // console.log("latitude", this.latitude);
      // console.log("longitude", this.longitude);
      // console.log("poster", this.fileLocation);
      
      eventGames = [form.value.eventGames];
      eventCategory = [form.value.eventTag];
      success = true;
      // console.log("coyyy", eventGames[0]);
      // console.log("cukk", eventCategory[0]);

      axios({
        method: 'put',
        url: environment.endPointConstant.createEvent + '/' + this.username,
        headers: {
          "Content-Type": "application/json"
        },
        data:
        {
          'name': form.value.eventName,
          'makerusername': this.username,
          'type': form.value.eventType,
          'games': eventGames,
          'category': eventCategory,
          'description': form.value.description,
          'site': form.value.eventSite,
          'dateStart': form.value.startDate,
          'dateEnd': form.value.endDate,
          'latitude': this.latitude.toString(),
          'longitude': this.longitude.toString(),
          'poster': this.fileLocation
        }
      })
      .then(function (response) {
        console.log(response);
      })
    }
    
    return new Promise(() => {
      setTimeout(() => {
        this.presentAlert(success, stringNotification);
      }, 2500);
    });
  }

  onChooseFile() {
    this.fileChooser.open().then(uri => {
      this.filePath.resolveNativePath(uri).then((nativePath) => {
        this.base64.encodeFile(nativePath).then((base64string) => {
          if (this.calculateImageSize(base64string) > 1500) {
            alert("Please upload an image below 1500 MB.");
          }
          else {
            this.fileLocation = base64string;
          }
        })
      })
    })
    .catch(e => {
      console.log(e);
    })
  }

  calculateImageSize(base64String) {
    let padding, inBytes, base64StringLength;
    if(base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;
    else padding = 0;

    base64StringLength = base64String.length;
    alert("STRING LENGTH" + base64StringLength);
    inBytes =(base64StringLength / 4 ) * 3 - padding;
    alert("IN BYTES" + inBytes);
    this.kbytes = inBytes / 1000;
    alert("IN KBytes" + this.kbytes);
    return this.kbytes;
  }

  changeType(eventType) {
    this.eventType = eventType;
    console.log(eventType);
  }

  changeTag(eventTag) {
    this.eventTag = eventTag;
    console.log(eventTag);
  }

  changeSite(eventSite) {
    this.eventSite = eventSite;
    console.log(eventSite);
  }
}