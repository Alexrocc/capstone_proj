import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/auth/auth-data';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId!: number;
  currentUser$!: Observable<User>;
  currentUserWishlist$ = new BehaviorSubject<Steam[] | null>(null);
  wishlist!: Steam[];

  constructor(private steamSrv: SteamService) {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userId = parsedUser.user.id;
      if (parsedUser.user.wishlist.length > 0) {
        this.wishlist = parsedUser.user.wishlist;
      }
    }
  }

  ngOnInit(): void {
    this.steamSrv.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.currentUser$ = of(res);
        this.currentUserWishlist$.next(res.wishlist);
      } else {
        throw new Error();
      }
    });
  }

  removeFromWishlist(game: Steam) {
    let gameIndex = this.wishlist.map((e) => e.id).indexOf(game.id);
    this.wishlist.splice(gameIndex, 1);
    this.currentUserWishlist$.next(this.wishlist);
    this.currentUserWishlist$.subscribe();
    this.steamSrv.patchUserWishlist(this.wishlist, this.userId).subscribe();
  }

  ngOnDestroy(): void {
    this.currentUserWishlist$.unsubscribe();
  }
}
