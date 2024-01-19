import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth-data';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId!: number;
  currentUser!: User;
  currentUserWishlist!: Steam[] | null;

  constructor(private steamSrv: SteamService) {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userId = parsedUser.user.id;
      if (parsedUser.user.wishlist.length > 0) {
        this.currentUserWishlist = parsedUser.user.wishlist;
      } else {
        this.currentUserWishlist = null;
      }
    }
  }

  ngOnInit(): void {
    this.steamSrv.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.currentUser = res;
      } else {
        throw new Error();
      }
    });
  }
}
