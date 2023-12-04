import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import jwt_decode from "jwt-decode";
import {KeycloakService} from "../../core/keycloack/keycloack.service";
import {CommonService} from "../../services/common.service";
import {LocalStorageService} from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage,
              private commonService: CommonService,
              private localStorageService: LocalStorageService,
              private keycloakService: KeycloakService) {
    this.init();


  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this.storage = await this.storage.create();
  }

  public async setItem(key: string, value: string) {
    this.storage?.set(key, value);
  }

  public async getItem(value: any) {
    return this.storage?.get(value);
  }

  public async checkIfTokenExists() {
    try {
      let token = this.getItem('token');
      return !!token;
    } catch (error) {
      console.error('Error occurred while getting token:', error);
      throw error; // Rethrow the error to handle it at a higher level
    }
  }

  public async getToken(value: any) {
    try {
      // let token = await this.storage?.get(value);
      let token =  this.localStorageService.getUserToken();
      await this.getWorkingToken(token);
      return this.localStorageService.getUserToken();
    } catch (error) {
      console.error('Error occurred while getting token:', error);
      throw error; // Rethrow the error to indicate that something went wrong
    }
  }

  async getRefreshToken(value:any){
    return this.storage?.get(value);

  }

  public async getWorkingToken(tokenFromStorage: any) {
    try {
      const decodedToken = jwt_decode(tokenFromStorage);
      // @ts-ignore
      const expireDate = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();
      if (expireDate < currentTimestamp) {
        await this.getAnotherToken();
      }
    } catch (error) {
      console.error('Error occurred while processing token:', error);
      throw error;
    }
  }

  public async getAnotherToken() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const refreshToken = await this.storage?.get('refresh_token');
        if (!refreshToken) {
          reject('Refresh token not found');
          return;
        }

        this.keycloakService.refreshToken(await refreshToken).subscribe(
          (response) => {
            this.setItem('token', response.access_token);
            this.setItem('refresh_token', response.refresh_token);
            resolve();
          },
          (error) => {
            console.error('Error occurred while refreshing token:', error);
            reject(error); // Reject the promise if there's an error
            this.commonService.goToRoute('login-register')
          }
        );
      } catch (error) {
        console.error('Error occurred while getting refresh token:', error);
        reject(error);
      }
    });
  }

  public async removeToken(key: string) {
    await this.storage?.remove(key);
  }

  public async clearAllFromStorage() {
    await this.storage?.clear()
  }
}
