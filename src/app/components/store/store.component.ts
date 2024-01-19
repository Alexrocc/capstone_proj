import { Component, OnInit } from '@angular/core';
import { Steam } from 'src/app/interfaces/steam';
import { Router } from '@angular/router';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  store!: Steam[];
  userId!: number;
  userWishlist!: object[] | undefined;
  userLibrary!: object[] | undefined;

  constructor(private router: Router, private steamSrv: SteamService) {
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
      this.store = res;
    });
  }
}
