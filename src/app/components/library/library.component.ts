import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth-data';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  userId!: number;
  currentUser!: User;
  currentUserLibrary!: object[] | undefined;

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
        this.currentUserLibrary = res.wishlist;
      } else {
        throw new Error();
      }
    });
  }
}
