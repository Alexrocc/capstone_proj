import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Steam } from '../interfaces/steam';
import { User } from '../auth/auth-data';

@Injectable({
  providedIn: 'root',
})
export class SteamService {
  apiURL = environment.apiURL;
  userDb = environment.userDataURL;

  constructor(private http: HttpClient) {}

  getStore() {
    return this.http.get<Steam[]>(`${this.apiURL}`);
  }

  getSingleGame(gameId: number) {
    return this.http.get<Steam>(`${this.apiURL}/${gameId}`);
  }

  getUser(userId: number) {
    return this.http.get<User>(`${this.userDb}/users/${userId}`);
  }
}
