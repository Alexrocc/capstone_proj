import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/auth/auth-data';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  game!: Steam;
  isInWishlist$ = new BehaviorSubject<true | null>(null);
  userWishlist: Steam[] = [];
  isInLibrary$ = new BehaviorSubject<true | null>(null);
  userLibrary: Steam[] = [];
  userId!: number;
  currentUser!: User;

  constructor(
    private actRoute: ActivatedRoute,
    private steamSrv: SteamService
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userId = parsedUser.user.id;
    }
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      const gameId = Number(params.get('id'));
      if (!isNaN(gameId)) {
        this.steamSrv.getSingleGame(gameId).subscribe((res) => {
          this.game = res;
          this.steamSrv.getUser(this.userId).subscribe((res) => {
            this.currentUser = res;
            this.userWishlist = res.wishlist;
            this.userLibrary = res.library;
            this.checkLibrary();
            this.checkWishlist();
          });
        });
      }
    });
  }

  checkWishlist() {
    let check = this.userWishlist.some((obj) => obj.name === this.game.name);
    if (check) {
      this.isInWishlist$.next(true);
      this.isInWishlist$.subscribe();
    } else {
      this.isInWishlist$.next(null);
      this.isInWishlist$.subscribe();
    }
  }

  checkLibrary() {
    let check = this.userLibrary.some((obj) => obj.name === this.game.name);
    if (check) {
      this.isInLibrary$.next(true);
      this.isInLibrary$.subscribe();
    } else {
      this.isInLibrary$.next(null);
      this.isInLibrary$.subscribe();
    }
  }

  removeFromWishlist(game: Steam) {
    let gameIndex = this.userWishlist.map((e) => e.id).indexOf(game.id);
    this.userWishlist.splice(gameIndex, 1);
    this.isInWishlist$.next(null);
    this.isInWishlist$.subscribe();
    this.steamSrv.patchUserWishlist(this.userWishlist, this.userId).subscribe();
  }

  addToWishlist(game: Steam) {
    this.userWishlist.push(game);
    this.isInWishlist$.next(true);
    this.isInWishlist$.subscribe();
    this.steamSrv.patchUserWishlist(this.userWishlist, this.userId).subscribe();
  }

  addToLibrary(game: Steam) {
    this.userLibrary.push(game);
    this.isInLibrary$.next(true);
    this.isInLibrary$.subscribe();
    this.steamSrv.patchUserLibrary(this.userLibrary, this.userId).subscribe();
  }

  ngOnDestroy(): void {
    this.isInLibrary$.unsubscribe();
    this.isInWishlist$.unsubscribe();
  }
}
