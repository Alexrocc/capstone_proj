import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from, Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth-data';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  userId!: number;
  currentUser!: User;
  currentUserLibrary: Observable<Steam>[] = [];
  subscriptions: Subscription[] = [];

  constructor(private steamSrv: SteamService) {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userId = parsedUser.user.id;
    }
  }

  ngOnInit(): void {
    this.steamSrv.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.currentUser = res;

        this.currentUser.library.forEach((item) => {
          let newObservable = from([item]);
          let sub = newObservable.subscribe();
          this.currentUserLibrary.push(newObservable);
          this.subscriptions.push(sub);
        });
      } else {
        throw new Error();
      }
    });
  }

  removeFromLibrary() {}

  ngOnDestroy(): void {
    // patch allo user
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
