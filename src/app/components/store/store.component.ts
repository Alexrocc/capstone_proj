import { Component, OnInit } from '@angular/core';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  store$!: Observable<Steam[] | null>;
  userId!: number;
  userWishlist!: Steam[];
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
    if (typeof this.userId === 'number') {
      this.steamSrv.getUser(this.userId).subscribe((res) => {
        this.userWishlist = res.wishlist;
        this.userLibrary = res.library;
      });
    }
    this.steamSrv.getStore().subscribe((res) => {
      if (res) {
        this.store$ = from([res]);
        this.resError = false;
      } else {
        this.resError = true;
        throw new Error();
      }
    });
  }
}
