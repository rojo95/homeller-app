import { Component, OnInit } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { HousesService } from 'src/app/services/houses/houses.service';
import { PricesService } from 'src/app/services/prices/prices.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.page.html',
  styleUrls: ['./houses.page.scss'],
})
export class HousesPage implements OnInit {
  params = {} as any;
  houses: any[] = [];
  networkStatus: ConnectionStatus = { connected: true, connectionType: 'none' };
  toolbarClass: string = '';

  constructor(
    private housesService: HousesService,
    private pricesService: PricesService
  ) {}

  ngOnInit() {
    this.params.page = 0;
    this.getHouses();
    if (Network) {
      Network.getStatus().then((status) => {
        this.networkStatus = status;
        this.toolbarClass = !status.connected ? 'disconected' : '';
      });
    }

    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      this.toolbarClass = !status.connected ? 'disconected' : '';
    });
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
  }

  priceFormat(price: number) {
    return this.pricesService.priceFormat(price);
  }

  async searchHouses() {
    this.params.page = 1;
    (await this.housesService.getHouses(this.params)).subscribe({
      next: (res: any) => {
        this.houses = res;
      },
      error: (error: any) => {},
    });
  }
}
