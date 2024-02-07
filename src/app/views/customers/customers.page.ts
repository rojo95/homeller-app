import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  constructor(
    private router: Router,
    private customerService: CustomersService
  ) {}
  customers: any[] = [];
  params = {} as any;
  searchedUser: any;
  permission!: boolean;

  async ngOnInit() {
    this.permission = true;
    this.params.page = 0;
    this.getCustomers();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  async getCustomers(event?: any) {
    this.params.page += 1;
    (await this.customerService.getCustomers(this.params)).subscribe({
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
      error: (error: any) => {
      },
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
