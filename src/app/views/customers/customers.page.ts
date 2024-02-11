import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { finalize } from 'rxjs/operators';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  constructor(
    private customerService: CustomersService,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}
  loading: boolean = true;
  skeleton = Array(7);
  customers: any[] = [];
  params = {} as any;
  searchedUser: any;
  permission!: boolean;

  async ngOnInit() {
    this.permission = true;
    this.params.page = 0;
    this.getCustomers();
  }

  async getCustomers(event?: any) {
    this.params.page += 1;
    (await this.customerService.getCustomers(this.params))
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.customers.push(...res.results);
          if (event) event.target.complete();
        },
        error: (error: any) => {
          if (event) event.target.complete();
        },
      });
  }

  async searchCustomers() {
    this.params.page = 1;
    (await this.customerService.getCustomers(this.params)).subscribe({
      next: (res: any) => {
        this.customers = res.results;
        console.log(this.customers);
      },
      error: (error: any) => {},
    });
  }

  async doRefresh(event: any) {
    this.loading = true;
    this.customers = [];
    this.params.page = 0;
    await this.getCustomers();
    event.target.complete();
  }

  public async makePhoneCall(phoneNumber: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Llamar',
          role: 'accept',
          icon: 'call',
          handler: () => {
            window.open('tel:' + phoneNumber);
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

  public async deleteUser(id: number) {
    const alert = await this.alertCtrl.create({
      header: '¿DESEA ELIMINAR EL CONTACTO DEL CLIENTE?',
      message: 'Ésta accion no puede ser reversada.',
      buttons: [
        'NO',
        {
          text: 'SÍ',
          handler: () => {
            this.disableCustomer(id);
          },
        },
      ],
    });

    alert.present();
  }

  async disableCustomer(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando Cliente...',
    });

    loading.present();

    const idCustomer = await this.customers.findIndex(
      (val: any) => val.id === id
    );
    this.customers.splice(idCustomer, 1);
    loading.dismiss();
  }
}
