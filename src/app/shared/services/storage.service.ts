import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import jwt_decode from "jwt-decode";
import {KeycloakService} from "../../core/keycloack/keycloack.service";
import {CommonService} from "../../services/common.service";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage,
              private commonService: CommonService,
              private keycloakService: KeycloakService) {
    this.init();
  }

  async init() {
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
      let token = await this.storage?.get(value);
      await this.getWorkingToken(token);
      return await this.storage?.get(value);
    } catch (error) {
      console.error('Error occurred while getting token:', error);
      throw error; // Rethrow the error to indicate that something went wrong
    }
  }

  public async getWorkingToken(tokenFromStorage: any) {
    try {
      const decodedToken = jwt_decode(tokenFromStorage);
      // @ts-ignore
      const expireDate = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();
      if (expireDate < currentTimestamp) {
        await this.getAnotherToken();
      } else {
        return;
      }
    } catch (error) {
      console.error('Error occurred while processing token:', error);
      throw error;
    }
  }

  public async getAnotherToken() {
    return new Promise<void>(async (resolve, reject) => {
      const refreshToken = this.storage?.get('refresh_token');
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
    });
  }

  public async removeToken(key: string) {
    await this.storage?.remove(key);
  }

  public async clearAllFromStorage() {
    await this.storage?.clear()
  }
}
