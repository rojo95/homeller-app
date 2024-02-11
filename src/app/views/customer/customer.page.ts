import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  id: any;
  customer = {} as any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomersService
  ) {}

  async ngOnInit() {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id');
    this.getCustomer();
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
