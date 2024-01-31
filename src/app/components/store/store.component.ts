import { Component, OnInit } from '@angular/core';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';
import { BehaviorSubject, Observable, from, map } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  store$!: Observable<Steam[] | null>;
  userId!: number;
  userLibrary!: Steam[];
  resError: boolean = false;

  constructor(private steamSrv: SteamService) {
    const user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userId = parsedUser.user.id;
    }
  }

  ngOnInit(): void {
    this.steamSrv.getStore().subscribe((res) => {
      if (res) {
        this.store$ = from([res]);
        this.resError = false;
      } else {
        this.resError = true;
        throw new Error();
      }
    });
    if (typeof this.userId === 'number') {
      this.steamSrv.getUser(this.userId).subscribe((res) => {
        this.userLibrary = res.library;
      });
    }
  }

  checkLibrary(name: string): boolean {
    return (
      Array.isArray(this.userLibrary) &&
      this.userLibrary.some((e) => e.name === name)
    );
  }
}
