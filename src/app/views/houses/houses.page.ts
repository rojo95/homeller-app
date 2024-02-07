import { Component, OnInit } from '@angular/core';
import { HousesService } from 'src/app/services/houses/houses.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.page.html',
  styleUrls: ['./houses.page.scss'],
})
export class HousesPage implements OnInit {
  constructor(private housesService: HousesService) {}
  params = {} as any;
  houses: any[] = [];

  ngOnInit() {
    this.params.page = 0;
    this.getHouses();
  }

  async getHouses(event?: any) {
    this.params.page += 1;
    (await this.housesService.getHouses(this.params)).subscribe({
      next: (res: any) => {
        this.houses.push(...res);
        if (event) event.target.complete();
      },
      error: (error: any) => {
        if (event) event.target.complete();
      },
    });
    console.log('houses', this.houses);
  }
}
