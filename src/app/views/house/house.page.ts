import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousesService } from 'src/app/services/houses/houses.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PricesService } from 'src/app/services/prices/prices.service';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { ConnectionStatus, Network } from '@capacitor/network';

@Component({
  selector: 'app-house',
  templateUrl: './house.page.html',
  styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {
  id: any;
  params = {} as any;
  house = {} as any;
  images: any[] = [];
  description: any;
  networkStatus: ConnectionStatus = { connected: true, connectionType: 'none' };
  toolbarClass: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private housesService: HousesService,
    private sanitizer: DomSanitizer,
    private pricesService: PricesService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id');
    this.getHouse();
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

  async presentToast(props: {
    position?: 'top' | 'middle' | 'bottom';
    text: string;
    duration: number;
    icon?: string;
  }) {
    const { position = 'bottom', text, duration = 1500, icon } = props;
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
      position: position,
      ...(icon && { icon: icon }),
    });

    await toast.present();
  }

  async getHouse() {
    (await this.housesService.getHouse(this.id)).subscribe({
      next: (res: any) => {
        this.house = res;
        this.images.push(res.mainImage, ...res.images);
        this.description = this.sanitizer.bypassSecurityTrustHtml(
          res.description
        );
      },
      error: (error: any) => {},
    });
  }

  priceFormat(price: number) {
    return this.pricesService.priceFormat(price);
  }

  async writeToClipboard() {
    await Clipboard.write({
      string: this.removeHtml(this.house.description),
    });
    this.presentToast(<any>{
      text: 'Descripción de venta copiada al porta papeles.',
      icon: 'copy-outline',
    });
  }

  removeHtml(htmlString: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body?.textContent || '';
  }
}
