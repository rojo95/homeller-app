import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from '../services/customers/customers.service';
import { HousesService } from '../services/houses/houses.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [CustomersService, HousesService]
})
export class SharedModule { }
