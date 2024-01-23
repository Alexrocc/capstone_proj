import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  currentUserLibrary!: Steam[];
  library$ = new BehaviorSubject<Steam[] | null>(null);

  constructor(private steamSrv: SteamService) {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userId = parsedUser.user.id;
    }
  }

  ngOnInit(): void {
    this.steamSrv.getUser(this.userId).subscribe((res) => {
      this.currentUser = res;
      this.currentUserLibrary = res.library;
      this.library$.next(this.currentUserLibrary);
    });
  }

  removeFromLibrary(game: Steam) {
    let gameIndex = this.currentUserLibrary.map((e) => e.id).indexOf(game.id);
    this.currentUserLibrary.splice(gameIndex, 1);
    this.library$.next(this.currentUserLibrary);
    this.library$.subscribe();
    this.steamSrv
      .patchUserLibrary(this.currentUserLibrary, this.userId)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.library$.unsubscribe();
  }
}
