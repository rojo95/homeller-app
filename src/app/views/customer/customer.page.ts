import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { finalize } from 'rxjs';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  id: any;
  customer = {} as any;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomersService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id');
    this.getCustomer();
  }

  async getCustomer() {
    (await this.customerService.getCustomer(this.id))
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.customer = res;
        },
        error: (error: any) => {},
      });
  }

  doRefresh(event: any) {
    // this.getCustomers();
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  public async makePhoneCall() {
    const actionSheet = await this.actionSheetController.create({
      header: `Llamar a ${this.customer.name}`,
      buttons: [
        {
          text: 'Llamar',
          role: 'accept',
          icon: 'call',
          handler: () => {
            window.open('tel:' + this.customer.name || '+584125555555');
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  async deleteCustomer() {
    const alert = await this.alertCtrl.create({
      header: '¿DESEA ELIMINAR EL CONTACTO DEL CLIENTE?',
      message: 'Ésta accion no puede ser reversada.',
      buttons: [
        'NO',
        {
          text: 'SÍ',
          handler: async () => {
            this.disabling();
          },
        },
      ],
    });

    alert.present();
  }

  async disabling() {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando Cliente...',
    });

    await loading.present();

    // todo agregar logica para deshabilitar cliente
    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['customers']);
    }, 500);
  }

  shareClient() {
    // todo agregar logica para compartir cliente
  }
}
