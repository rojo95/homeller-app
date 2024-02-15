import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionStatus, Network } from '@capacitor/network';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  id: any;
  customer = {} as any;
  networkStatus: ConnectionStatus = { connected: true, connectionType: 'none' };
  toolbarClass: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomersService
  ) {}

  async ngOnInit() {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id');
    this.getCustomer();

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

  async getCustomer() {
    (await this.customerService.getCustomer(this.id)).subscribe({
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
}
