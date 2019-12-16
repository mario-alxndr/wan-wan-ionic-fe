import { Component, OnInit} from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { Base64 } from '@ionic-native/base64/ngx';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { toBase64String } from '@angular/compiler/src/output/source_map';

const TOKEN_LOGIN = 'login-key';
const TOKEN_USERNAME = 'username-key';
const TOKEN_ID = 'userid-key';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profileImage : string;
  username : String;
  phoneNumber : number;
  gameList : String[];
  gameInput : String[];
  gameList1 : String;
  gameList2 : String;
  gameList3 : String;
  fileLocation = "";
  private kbytes;
  stringLoading = "";

  constructor(private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage,
    private base64: Base64,
    private alertController: AlertController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private loadingCtrl: LoadingController,
    ) {
      this.loadData();
     }

  ngOnInit() {
  }

  loadData(){
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.storage.get(TOKEN_LOGIN).then(userObject => {
      console.log(userObject)
      var tempUserObject = JSON.parse(userObject);
      console.log("edit-profile-load-data", tempUserObject);

      this.username = tempUserObject.username;
      this.phoneNumber = tempUserObject.phoneNumber;
      
      if(tempUserObject.profileImage === ""){
        this.profileImage = environment.defaultImageProfile;
      }
      else{
        this.profileImage = tempUserObject.profileImage;
      }

      if(tempUserObject.gameList === null){
        this.gameList = [""];
        this.gameList1 = "";
        this.gameList2 = "";
        this.gameList3 = "";
      }
      else{
        this.gameList = tempUserObject.gameList;
        this.gameList1 = tempUserObject.gameList[0];
        this.gameList2 = tempUserObject.gameList[1];
        this.gameList3 = tempUserObject.gameList[2];
      }
    });
    this.loadingCtrl.dismiss();
  }

  onSubmitGameList(form:NgForm){
    var stringNotification= "";
    var success = false;
    var profileEditPage = this;

    if(form) {
      console.log("edit-profile-form-game", form);
      this.gameInput = [form.value.game1, form.value.game2, form.value.game3];
      if(this.gameInput[0] == ""){
        if(this.gameList[0] == ""){
          while(this.gameList[0] == ""){
            this.gameInput[0] = this.gameInput[1];
            this.gameInput[1] = this.gameInput[2];
            this.gameInput[2] = ""
          }
        }
        else{
          this.gameInput[0] = this.gameList[0];
        }
      }
      if(this.gameInput[1] == ""){
        if(this.gameList[1] == ""){
          this.gameInput[1] = this.gameInput[2];
          this.gameInput[2] = ""
        }
        else{
          this.gameInput[1] = this.gameList[1];
        }
      }
      if(this.gameInput[2] == ""){
        if(this.gameList[2] != ""){
          this.gameInput[2] = this.gameList[2];
        }
      }
      console.log("Game List: ", this.gameList, this.gameInput);
      this.stringLoading = "Updating your game list ..."
      this.presentLoading(this.stringLoading);
      this.storage.get(TOKEN_USERNAME).then(userObject => {
        axios({
          method: 'put',
          url: environment.endPointConstant.addUpdateGameList + userObject,
          headers: { "Content-Type": "application/json" },
          data: 
          {
            'gameList' : profileEditPage.gameInput
          }
        })
        .then(res => {
          console.log("edit-profile-response: ", res);
          if(res.data.response.responseCode === "Update Success"){
            stringNotification = res.data.response.message;
            profileEditPage.setToStorage();
            profileEditPage.loadingCtrl.dismiss();
            profileEditPage.presentAlert(stringNotification);
          }
        })
        .catch(error => {
          console.log("edit-profile-error", error);
        })
      });  
    }
  }

  onSubmitProfileImage(form:NgForm){
    var stringNotification= "";
    var success = false;
    var b64 : string;
    var profileEditPage = this;

    if(this.fileLocation != "") {
      this.stringLoading = "Updating your profile image ..."
      this.presentLoading(this.stringLoading);
      axios({
        method: 'put',
        url: environment.endPointConstant.addUpdateProfileImage + this.username,
        headers: { "Content-Type": "application/json" },
        data: 
        {
          'imageInString':  this.fileLocation,
          'username': this.username
        }
      })
      .then(res => {
        if(res.data.response.responseCode === "SUCCESS"){
          stringNotification = res.data.response.message;
        }
        profileEditPage.setToStorage();
        profileEditPage.loadingCtrl.dismiss();
        profileEditPage.presentAlert(stringNotification);
      })
      .catch(error => {
        console.log("axios error " + error);
      })  
    }
    else {
      this.presentAlert("Please choose an image !");
    }
  }

  onSubmitPhoneNumber(form: NgForm) {
    var stringNotification = "";
    var success = false;
    var profileEditPage = this;

    if(form){
      if(form.value.phone_number.toString().length < 8 || form.value.phone_number.toString().length > 15){
        stringNotification = "Please input valid phone number!";
        this.presentAlert(stringNotification);
      }
      else{
        this.storage.get(TOKEN_LOGIN).then(userObject => {
          var tempUserObject = JSON.parse(userObject);
          this.stringLoading = "Updating your phone number ..."
          this.presentLoading(this.stringLoading);
          axios({
            method: 'put',
            url: environment.endPointConstant.addUpdatePhoneNumber + tempUserObject.username,
            headers: { "Content-Type": "application/json" },
            data: 
            {
              'phoneNumber': form.value.phone_number.toString()
            }
          })
          .then(res => {
            console.log("edit-profile-response: ", res);
            stringNotification = res.data.response.message;
            profileEditPage.setToStorage();
            profileEditPage.loadingCtrl.dismiss();
            profileEditPage.presentAlert(stringNotification);
          })
          .catch(error => {
            console.log("edit-profile-error", error);
          })
        });
      }
    }
  }

  setToStorage() {
    axios({
      method: 'get',
      url: environment.endPointConstant.getUserData + this.username,
      headers: { "Content-type": "application/json" }
    })
    .then(objectUsername => {
      this.storage.set(TOKEN_LOGIN, JSON.stringify(objectUsername)).then((response) => {});
    })
    .catch(error => {
      console.log(error);
    })
  }

  onChooseFile(){
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
    });
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

  async presentAlert(stringNotification) {
    const alertFailed = await this.alertController.create({
      header: '',
      message: stringNotification,
      buttons: ['OK']
    });

    await alertFailed.present();
  }

  presentLoading(stringLoading){
    console.log("mulai present")
    this.loadingCtrl.create({
      keyboardClose: true,
      message: stringLoading
    })
    .then(loadingEl => {
      loadingEl.present();
    })
    console.log("selesai present")
  }
}
