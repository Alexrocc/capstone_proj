import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Steam } from 'src/app/interfaces/steam';
import { SteamService } from 'src/app/services/steam.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  game!: Steam;

  constructor(
    private actRoute: ActivatedRoute,
    private steamSrv: SteamService
  ) {}

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      const gameId = Number(params.get('id'));
      if (!isNaN(gameId)) {
        this.steamSrv.getSingleGame(gameId).subscribe((res) => {
          this.game = res;
        });
      }
    });
  }
}
