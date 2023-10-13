import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import jwt_decode from "jwt-decode";
import {KeycloakService} from "../../core/keycloack/keycloack.service";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private keycloakService: KeycloakService) {
    this.init();
  }

  async init() {
    this.storage = await this.storage.create();
  }

  public setToken(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public async checkIfTokenExists() {
    try {
      let token = await this.storage?.get("token");
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
          this.setToken('token', response.access_token);
          this.setToken('refresh_token', response.refresh_token);
          resolve(); // Resolve the promise after successfully setting the tokens
        },
        (error) => {
          console.error('Error occurred while refreshing token:', error);
          reject(error); // Reject the promise if there's an error
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
